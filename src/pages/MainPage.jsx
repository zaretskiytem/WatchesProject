import React from "react";
import { 
  Container,
  Card,
  CardActions,CardContent,
  CardMedia,
  Button,
  Typography,
  Slider, 
} from "@mui/material";
import { ClientContext } from "../contexts/ClientProvider"


function MainPage() {
  const { getWatches, watches, filterByPrice, setFilterByPrice } = React.useContext(ClientContext);
  
  React.useEffect(() => {
    getWatches();
  }, [filterByPrice]);

  return (
    <div className="main-page">
      <Container>
        <h2>Весь каталог часов</h2>
        <div className="filter-block">
          <h4>Price Filter</h4>
          <Slider
          max={999999}
          min={0}
          valueLabelDisplay="auto"
          value={filterByPrice}
          onChange={(_, newValue) => setFilterByPrice(newValue)} />
        </div>
        <div className="products">
          {watches.map((item) => (
            <Card key={item.id} className="product-card">
              <CardMedia
                component="img"
                height="140"
                image={item.photo}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.name}
                </Typography>
                <ul className="product-card-ul">
                  <li>
                    <span>Brand</span>
                    <span>{item.brand}</span>
                  </li>
                  <li>
                    <span>Production Year</span>
                    <span>{item.year}</span>
                  </li>
                  <li>
                    <span>Production Country</span>
                    <span>{item.country}</span>
                  </li>
                  <li>
                    <span>Price:</span>
                    <span>{item.price}</span>
                  
                  </li>
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default MainPage;
