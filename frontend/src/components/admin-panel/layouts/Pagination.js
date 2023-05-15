function Pagination({totalPage}) {
    let totalData = [];
    for (let i = 0; i < parseInt(totalPage)/5; i++) {
        totalData.push(i);
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                {totalData.map((item, index) => (
                    <li key={index} className="page-item"><a className="page-link" href="#">{index + 1}</a></li>
                ))}
                <li className="page-item"><a className="page-link" href="#">Next</a></li>


            </ul>
        </nav>

    )
}

export default Pagination;