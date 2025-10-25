import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFestivalNotices, type FestivalNoticeItem } from "@/apis/notice/getFestivalNotices";
import EmptyComponent from "@/components/common/EmptyComponent";

interface FestivalContentNoticeSectionProps {
  festivalId: string;
  managerId: number | null;
}

const FestivalContentNoticeSection = ({ festivalId, managerId }: FestivalContentNoticeSectionProps) => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['festival-notices', festivalId, managerId, page, size],
    queryFn: () => getFestivalNotices(festivalId, page, size),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data</div>;
  
  // 공지사항이 없을 때
  if (data?.data?.content?.length === 0) {
    return (
        <div className="w-full h-full flex flex-col gap-2">
        <EmptyComponent
          title="공지사항"
          description="아직 공지사항이 없습니다."
        />
      </div>
    );
  }
  
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <h3 className="text-sm text-gray-900 font-bold">공지사항</h3>
      <div className="w-full h-full flex flex-col gap-2">
        {data?.data?.content?.map((notice) => (
          <div key={notice.id} className="w-full h-full flex flex-col gap-2">
            <p className="font-medium text-gray-900">{notice.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FestivalContentNoticeSection;