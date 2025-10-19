import { useState } from 'react';
import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Button from '@/components/common/Button';
import { postFestival, type PostFestivalRequest } from '@/apis/festivals/postFestival';
import { uploadImageFiles } from '@/utils/s3Upload';
import useNav from '@/hooks/useNav';
import AREA_OPTIONS from '@/constants/areaOptions';
import MAX_MEDIA_SIZE from '@/constants/maxMediaSize';

const SettingsFestivalRegisterPage = () => {
  const { goBack } = useNav();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingPoster, setIsUploadingPoster] = useState(false);
  const [isUploadingImages, setIsUploadingImages] = useState(false);

  // 폼 데이터
  const [formData, setFormData] = useState({
    title: '',
    areaCode: '0',
    addr1: '',
    addr2: '',
    startDate: '',
    endDate: '',
    homePage: '',
    overView: '',
  });

  const [posterInfo, setPosterInfo] = useState<{ id: number; presignedUrl: string } | null>(null);
  const [imageInfos, setImageInfos] = useState<Array<{ id: number; presignedUrl: string }>>([]);
  const [posterPreview, setPosterPreview] = useState<string | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // 폼 입력 핸들러
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 포스터 이미지 업로드
  const handlePosterUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_MEDIA_SIZE.IMAGE) {
      alert(`이미지 크기는 ${MAX_MEDIA_SIZE.IMAGE / 1024 / 1024}MB를 초과할 수 없습니다.`);
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    try {
      setIsUploadingPoster(true);

      // 미리보기
      const reader = new FileReader();
      reader.onload = (e) => {
        setPosterPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // S3 업로드
      const uploaded = await uploadImageFiles([file]);
      setPosterInfo(uploaded[0]);
    } catch (error) {
      console.error('포스터 업로드 실패:', error);
      alert('포스터 업로드에 실패했습니다.');
      setPosterPreview(null);
      setPosterInfo(null);
    } finally {
      setIsUploadingPoster(false);
    }
  };

  // 추가 이미지 업로드
  const handleImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);

    // 최대 10개 제한
    if (imageInfos.length + fileArray.length > 10) {
      alert(`이미지는 최대 10개까지 업로드 가능합니다. (현재: ${imageInfos.length}개)`);
      return;
    }

    // 파일 크기 체크
    const oversizedFiles = fileArray.filter((f) => f.size > MAX_MEDIA_SIZE.IMAGE);
    if (oversizedFiles.length > 0) {
      alert(
        `일부 파일의 크기가 ${MAX_MEDIA_SIZE.IMAGE / 1024 / 1024}MB를 초과합니다.\n문제 파일: ${oversizedFiles.map((f) => f.name).join(', ')}`
      );
      return;
    }

    try {
      setIsUploadingImages(true);

      // 미리보기
      const newPreviews: string[] = [];
      for (const file of fileArray) {
        const reader = new FileReader();
        await new Promise<void>((resolve) => {
          reader.onload = (e) => {
            newPreviews.push(e.target?.result as string);
            resolve();
          };
          reader.readAsDataURL(file);
        });
      }
      setImagePreviews((prev) => [...prev, ...newPreviews]);

      // S3 업로드
      const uploaded = await uploadImageFiles(fileArray);
      setImageInfos((prev) => [...prev, ...uploaded]);
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다.');
    } finally {
      setIsUploadingImages(false);
    }
  };

  // 이미지 삭제
  const handleRemoveImage = (index: number) => {
    setImageInfos((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // 폼 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    if (!formData.title.trim()) {
      alert('축제 제목을 입력해주세요.');
      return;
    }

    if (!posterInfo) {
      alert('포스터 이미지를 업로드해주세요.');
      return;
    }

    if (imageInfos.length === 0) {
      alert('축제 이미지를 최소 1개 이상 업로드해주세요.');
      return;
    }

    if (!formData.startDate || !formData.endDate) {
      alert('축제 시작일과 종료일을 입력해주세요.');
      return;
    }

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      alert('종료일은 시작일 이후여야 합니다.');
      return;
    }

    if (!formData.addr1.trim()) {
      alert('주소를 입력해주세요.');
      return;
    }

    if (!formData.overView.trim()) {
      alert('축제 개요를 입력해주세요.');
      return;
    }

    // overView 길이 검증 추가
    if (formData.overView.length < 30) {
      alert('축제 개요는 최소 30자 이상 입력해주세요.');
      return;
    }

    if (formData.overView.length > 5000) {
      alert('축제 개요는 최대 5000자까지 입력 가능합니다.');
      return;
    }

    try {
      setIsSubmitting(true);

      const requestData: PostFestivalRequest = {
        title: formData.title,
        areaCode: Number(formData.areaCode),
        addr1: formData.addr1,
        addr2: formData.addr2,
        posterInfo,
        imageInfos,
        startDate: formData.startDate,
        endDate: formData.endDate,
        homePage: formData.homePage,
        overView: formData.overView,
      };

      const response = await postFestival(requestData);

      // location header에서 축제 ID 추출
      const location = response.headers?.location;
      const festivalId = location?.split('/').pop();

      alert('축제가 성공적으로 등록되었습니다!');
      
      if (festivalId) {
        // 등록된 축제 상세 페이지로 이동하거나 목록으로 이동
        goBack();
      } else {
        goBack();
      }
    } catch (error: any) {
      console.error('축제 등록 실패:', error);
      
      // 서버에서 보낸 필드 에러 처리
      if (error.response?.data?.fieldErrors) {
        const fieldErrors = error.response.data.fieldErrors;
        const errorMessages = fieldErrors.map((error: any) => 
          `${Object.keys(error)[0]}: ${Object.values(error)[0]}`
        ).join('\n');
        alert(`입력 오류:\n${errorMessages}`);
        return;
      }
      
      if (error.response?.status === 403) {
        alert('축제 등록 권한이 없습니다. 축제 관리자 승인이 필요합니다.');
      } else {
        alert('축제 등록에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isUploading = isUploadingPoster || isUploadingImages;

  return (
    <Container>
      <Header variant="page" title="축제 등록하기" />
      <div className="p-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* 축제 제목 */}
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="font-semibold">
              축제 제목 <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="축제 제목을 입력하세요"
              className="border rounded-lg p-3"
              disabled={isSubmitting}
            />
          </div>

          {/* 지역 선택 */}
          <div className="flex flex-col gap-2">
            <label htmlFor="areaCode" className="font-semibold">
              지역 <span className="text-red-500">*</span>
            </label>
            <select
              id="areaCode"
              name="areaCode"
              value={formData.areaCode}
              onChange={handleInputChange}
              className="border rounded-lg p-3"
              disabled={isSubmitting}
            >
              {AREA_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* 주소 */}
          <div className="flex flex-col gap-2">
            <label htmlFor="addr1" className="font-semibold">
              주소 <span className="text-red-500">*</span>
            </label>
            <input
              id="addr1"
              name="addr1"
              type="text"
              value={formData.addr1}
              onChange={handleInputChange}
              placeholder="기본 주소를 입력하세요"
              className="border rounded-lg p-3"
              disabled={isSubmitting}
            />
            <input
              id="addr2"
              name="addr2"
              type="text"
              value={formData.addr2}
              onChange={handleInputChange}
              placeholder="상세 주소를 입력하세요 (선택)"
              className="border rounded-lg p-3"
              disabled={isSubmitting}
            />
          </div>

          {/* 축제 기간 */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold">
              축제 기간 <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2 items-center">
              <input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleInputChange}
                className="border rounded-lg p-3 flex-1"
                disabled={isSubmitting}
              />
              <span>~</span>
              <input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleInputChange}
                className="border rounded-lg p-3 flex-1"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* 홈페이지 */}
          <div className="flex flex-col gap-2">
            <label htmlFor="homePage" className="font-semibold">
              홈페이지 URL
            </label>
            <input
              id="homePage"
              name="homePage"
              type="url"
              value={formData.homePage}
              onChange={handleInputChange}
              placeholder="https://example.com"
              className="border rounded-lg p-3"
              disabled={isSubmitting}
            />
          </div>

          {/* 축제 개요 */}
          <div className="flex flex-col gap-2">
            <label htmlFor="overView" className="font-semibold">
              축제 개요 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="overView"
              name="overView"
              value={formData.overView}
              onChange={handleInputChange}
              placeholder="축제에 대한 자세한 설명을 30자 이상 입력하세요 (최대 5000자)"
              className="border rounded-lg p-3 min-h-[120px]"
              disabled={isSubmitting}
              maxLength={5000}
            />
            <div className="flex justify-between text-sm">
              <span className={`${formData.overView.length < 30 ? 'text-red-500' : 'text-gray-500'}`}>
                {formData.overView.length < 30 
                  ? `${formData.overView.length}/30자 (최소 30자 필요)` 
                  : `${formData.overView.length}/5000자`
                }
              </span>
              {formData.overView.length > 5000 && (
                <span className="text-red-500">최대 5000자까지 입력 가능</span>
              )}
            </div>
          </div>

          {/* 포스터 이미지 */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold">
              포스터 이미지 <span className="text-red-500">*</span>
            </label>
            {posterPreview && (
              <div className="relative w-full aspect-[3/4] max-w-xs mx-auto">
                <img
                  src={posterPreview}
                  alt="포스터 미리보기"
                  className="w-full h-full object-cover rounded-lg border-2 border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPosterPreview(null);
                    setPosterInfo(null);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  ×
                </button>
              </div>
            )}
            <label htmlFor="poster-upload">
              <Button
                type="button"
                variant="secondary"
                className="w-full"
                disabled={isUploading || isSubmitting}
                onClick={() => document.getElementById('poster-upload')?.click()}
              >
                {isUploadingPoster ? '업로드 중...' : posterInfo ? '포스터 변경' : '포스터 업로드'}
              </Button>
            </label>
            <input
              id="poster-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePosterUpload}
              disabled={isUploading || isSubmitting}
            />
          </div>

          {/* 축제 이미지들 */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold">
              축제 이미지 (최대 10개) <span className="text-red-500">*</span>
            </label>
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={preview}
                      alt={`이미지 ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                      disabled={isSubmitting}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            <label htmlFor="images-upload">
              <Button
                type="button"
                variant="secondary"
                className="w-full"
                disabled={isUploading || isSubmitting || imageInfos.length >= 10}
                onClick={() => document.getElementById('images-upload')?.click()}
              >
                {isUploadingImages
                  ? '업로드 중...'
                  : `이미지 추가 (${imageInfos.length}/10)`}
              </Button>
            </label>
            <input
              id="images-upload"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImagesUpload}
              disabled={isUploading || isSubmitting || imageInfos.length >= 10}
            />
            <p className="text-sm text-gray-500">
              최소 1개, 최대 10개의 이미지를 업로드해주세요.
            </p>
          </div>

          {/* 제출 버튼 */}
          <div className="flex gap-2 pb-20">
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={goBack}
              disabled={isSubmitting || isUploading}
            >
              취소
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              disabled={isSubmitting || isUploading}
            >
              {isSubmitting ? '등록 중...' : '축제 등록'}
            </Button>
          </div>
        </form>
      </div>
      <Footer initialSelected="my" />
    </Container>
  );
};

export default SettingsFestivalRegisterPage;