import React from 'react'
import { Card } from 'react-bootstrap'

const BlogCard = () => {
    return (
        <Card className="blog-card">
            <Card.Body className='p-4'>
                <Card.Title>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</Card.Title>
                <Card.Subtitle>Author and Date</Card.Subtitle>
                <Card.Text>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur numquam vel id sit quia excepturi necessitatibus corrupti obcaecati accusamus eveniet non delectus repellendus ratione quae ab, magni perspiciatis eum aperiam?
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default BlogCard
