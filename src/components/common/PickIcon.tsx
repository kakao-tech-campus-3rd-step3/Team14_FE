import React from 'react';
import type { PickIconName } from '@/constants/pickIcons';
export interface PickIconProps {
  name: PickIconName;
  size?: number;
  className?: string;
}
/**
 * PickIcon 컴포넌트
 * svg로 저장한 각 캐릭터 일러스트를 이모지로 사용하기 위한 공용 컴포넌트 입니다
 * @param name - 아이콘 이름
 * @param size - 아이콘 크기
 * @param className - 아이콘 클래스
 * @returns
 */

const PickIcon: React.FC<PickIconProps> = ({ name, size = 24, className = '' }) => {
  const iconPath = `/pickEmoji/pick${name.charAt(0).toUpperCase() + name.slice(1)}.svg`;

  return (
    <img src={iconPath} alt={`${name} icon`} width={size} height={size} className={className} />
  );
};

export default PickIcon;
