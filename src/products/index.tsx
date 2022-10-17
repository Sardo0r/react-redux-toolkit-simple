import { useEffect, useState } from "react";
import ProductCounter from "./counter";
import styles from "./product.module.css";
import ProductRating from "./rating";

const Products = () => {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch("https://fakestoreapi.com/products")
			.then((res) => res.json())
			.then((json) => {
				setProducts(json);
				console.log(json);
				setIsLoading(false);
			});
	}, []);

	return (
		<div className={styles.container}>
			{isLoading ? (
				<h1>Loading...</h1>
			) : (
				<div className={styles.productContainer}>
					{products.map((product: any) => {
						return (
							<div key={product?.id} className={styles.product}>
								<div className={styles.productBody}>
									<img
										width={"100px"}
										height={"150px"}
										className={styles.image}
										src={product?.image}
										alt={product.title}
									/>
									<p>${product?.price}</p>
									<p>{product?.title}</p>
									<ProductRating
										count={product.rating.count}
										rate={product.rating.rate}
									/>
								</div>
								<ProductCounter id={product?.id} price={product?.price} />
								<p className={styles.category}>{product?.category}</p>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Products;
