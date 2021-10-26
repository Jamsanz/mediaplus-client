import React from 'react'

export interface IPost{
    id: string;
    title: string;
    body: string;
};

const Posts = ({posts}: any): JSX.Element => {
  
    return (
      <table className="table table-striped tabled-bordered" style={{width: "100%"}}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {posts?.map((post: IPost) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
            </tr>
          ))}  
        </tbody>
        {/* <ul className="list-group mb-4">
        </ul> */}
      </table>
    )
}

export default Posts
