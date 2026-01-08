const Pagenation = ({ currentPage, totalPages }) => {
  // 1부터 totalPages까지 배열 생성
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2.5 py-8">
      <button
        className="w-12 h-12 flex justify-center items-center border-none bg-transparent text-text-sub text-3xl cursor-pointer hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-default"
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`w-12 h-12 flex justify-center items-center border-none bg-transparent text-3xl cursor-pointer hover:bg-gray-100 rounded
            ${currentPage === number
              ? 'text-primary font-bold'
              : 'text-text-sub'}`}
        >
          {number}
        </button>
      ))}

      <button
        className="w-12 h-12 flex justify-center items-center border-none bg-transparent text-text-sub text-3xl cursor-pointer hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-default"
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagenation;
