const ProfileIcon = ({ size = 20, color = "currentColor", className }) => (
  <svg
    fill={color}
    height={size}
    viewBox="0 0 20 20"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path clipRule="evenodd" d="M5.84 15.63a6.97 6.97 0 0 0 8.32 0 8.2 8.2 0 0 0-8.32 0zM4.7 14.57a7 7 0 1 1 10.6 0 9.7 9.7 0 0 0-10.6 0zM10 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zm-1.5 7a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zm1.5-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" fillRule="evenodd">
      <path d="m8.78 17.62-.31-1.74H7.6c-.33 0-.66-.03-.98-.1L7 17.93c.12.66.5 1.21 1.02 1.55a2.5 2.5 0 0 0 1.83.38 2.5 2.5 0 0 0 1.58-.98c.37-.5.55-1.14.43-1.8l-.2-1.2H9.81l.27 1.5a.56.56 0 0 1-.11.44.7.7 0 0 1-.45.27.7.7 0 0 1-.5-.1.56.56 0 0 1-.26-.37Z" fillRule="evenodd"></path>
    </path>
  </svg>
);

export default ProfileIcon;