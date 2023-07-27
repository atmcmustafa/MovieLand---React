const Header = ({ children, className }) => {
  return (
    <h1 className={`text-4xl md:text-6xl font-bold shadow-2xl ${className} `}>
      {children}
    </h1>
  );
};

export default Header;
