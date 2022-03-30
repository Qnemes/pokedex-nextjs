const Header = (): JSX.Element => {
  return (
    <div
      className="flex justify-center items-center p-8 border-b-[1px] border-[rgba(0,0,0,.1)] 
      bg-gradient-to-r from-emerald-400 via-amber-400 to-red-400"
    >
      <img src="/images/logo.png" alt="Pokemon logo" className="w-auto h-16" />
    </div>
  );
};

export default Header;
