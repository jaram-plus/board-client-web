const PostList = ({ title, recommend, date, views }) => {
  return (
    <div className="w-[90rem] h-[3.3125rem] py-[0.9375rem] flex items-center justify-center border-b border-[#888] bg-white hover:bg-[#f0f0f0]">
      <div className="w-[75rem] flex justify-between items-center px-4">

        {/* 제목 영역 */}
        <div className="w-[24rem] shrink-0 pl-2">
          <h2 className="w-full h-6 overflow-hidden text-ellipsis whitespace-nowrap text-black text-base font-normal leading-normal m-0 font-['Inter']">
            {title}
          </h2>
        </div>

        {/* 정보 영역 (추천, 날짜, 조회) */}
        <div className="flex w-[20rem] justify-end items-center gap-6 shrink-0">
          <span className="w-[4.875rem] h-[1.1875rem] shrink-0 text-[#888] text-center font-['Inter'] text-base font-normal leading-normal">{recommend}</span>
          <span className="w-[4.875rem] h-[1.1875rem] shrink-0 text-[#888] text-center font-['Inter'] text-base font-normal leading-normal">{date}</span>
          <span className="w-[4.875rem] h-[1.1875rem] shrink-0 text-[#888] text-center font-['Inter'] text-base font-normal leading-normal">{views}</span>
        </div>

      </div>
    </div>
  );
};

export default PostList;