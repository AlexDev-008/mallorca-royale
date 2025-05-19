import React from "react";
import { Carousel, Card } from "react-bootstrap";

export function RestaurantCardCarousel ({ restaurants }) {
    if (!restaurants || restaurants.length === 0) {
        return <p>No hay restaurantes de lujo cerca del hotel</p>;
    }

    return (
        <div className="carousel-wrapper">
            <Carousel indicators={false}>
                {restaurants.map((restaurantWrapper, index) => {
                    const restaurant = restaurantWrapper.item;
                    const {
                        name,
                        description,
                        logo,
                        address,
                        url,
                        award,
                        servesCuisine,
                        image,
                        telephone
                    } = restaurant;

                    const displayImage = image?.[0]?.url || logo;

                    return (
                        <Carousel.Item key={index}>
                            <Card className="shadow-sm">
                                {displayImage && (
                                    <Card.Img
                                        variant="top"
                                        src={"https://www.bresmi.com/" + displayImage}
                                        alt={`Imagen de ${name}`}
                                        style={{ objectFit: "cover", maxHeight: "300px" }}
                                    />
                                )}
                                <Card.Body className="primary text-light p-5">
                                    <Card.Title className="fw-bold fs-2">{name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        {servesCuisine} • {award}
                                    </Card.Subtitle>
                                    <Card.Text style={{ maxHeight: "100px", overflow: "hidden", textOverflow: "ellipsis" }}>
                                        {description}
                                    </Card.Text>
                                    <Card.Text className="text-muted" style={{ fontSize: "0.9rem" }}>
                                        {address?.streetAddress}, {address?.addressLocality}
                                    </Card.Text>
                                    {telephone && <Card.Text>📞 {telephone}</Card.Text>}
                                    {url && <Card.Link href={url} target="_blank">Ver sitio web</Card.Link>}
                                </Card.Body>
                            </Card>
                        </Carousel.Item>
                    );
                })}
            </Carousel>
        </div>
    );
};