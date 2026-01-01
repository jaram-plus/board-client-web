import './Pagenation.css';

const Pagenation = ({ currentPage, totalPages }) => {
  // �t� �8 0� �1
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        disabled={currentPage === 1}
      >
        � t
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`pagination-button ${currentPage === number ? 'active' : ''}`}
        >
          {number}
        </button>
      ))}

      <button
        className="pagination-button"
        disabled={currentPage === totalPages}
      >
        �L �
      </button>
    </div>
  );
};

export default Pagenation;
