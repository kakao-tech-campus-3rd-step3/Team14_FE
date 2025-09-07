interface ProfileProps {
  className?: string;
  variant?: 'outline' | 'solid';
}

const Profile = ({ className, variant = 'outline' }: ProfileProps) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill={variant === 'solid' ? 'currentColor' : 'none'}
      width={24}
      height={24}
      viewBox="0 0 24 24"
    >
      {variant === 'outline' ? (
        <path
          d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <>
          <path d="M4.5 21a7.5 7.5 0 0115 0v1.5H4.5V21z" />
          <path d="M12 13a5 5 0 100-10 5 5 0 000 10z" />
        </>
      )}
    </svg>
  );
};

export default Profile;
