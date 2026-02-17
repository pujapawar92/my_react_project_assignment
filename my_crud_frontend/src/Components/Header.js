function Header() {
  return (
    <header className="w-full border-b bg-white shadow">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

       
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-black">
            <span className="text-blue-500">USER</span> MANAGEMENT
          </h1>
        </div>

       
        <div className="text-sm md:text-lg font-semibold text-gray-600">
          CRUD Assignment
        </div>

      </div>
    </header>
  );
}

export default Header;
