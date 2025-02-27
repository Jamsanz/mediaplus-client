import React from 'react'
import { Pagination as Pagination1 } from 'react-bootstrap';

const Pagination = ({ postPerPage, totalPosts, first, prev, next, last, paginate, active, setPostPerPage }: any) => {

  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <Pagination1 className="m-auto">
      <Pagination1.First onClick={first} />
      <Pagination1.Prev onClick={prev} />
      {pageNumber.map((num) => (
        <Pagination1.Item
          className="pagination-item"
          key={num}
          onClick={_ => paginate(num)}
          active={num === active}
        >
          {num}
        </Pagination1.Item>
      ))}
      <Pagination1.Next onClick={next} />
      <Pagination1.Last onClick={last} />
      <select className="ml-3 border-none" onChange={e => setPostPerPage(+e.target.value)}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="1000">1000</option>
      </select>
    </Pagination1>
  )
}

export default Pagination
