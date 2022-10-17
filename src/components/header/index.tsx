import { ArrowRightIcon, BackpackIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

const { Container, Text, Group, Indicator } = require("@mantine/core");

const Header = () => {
	const totalCount = useAppSelector(state => {
		let count = state.count.products.reduce((total: number, current: {
			count: number;
			id: number;
			price: number;
		}) => {
			return total + current.count
		}, 0)
		let price = state.count.products?.reduce((total: number, current: {
			count: number;
			id: number;
			price: number;
		}) => {
			return total + current.count * current.price
		}, 0)
		return { count, price }
	})
	const [sticky, setSticky] = useState(false);

	let inlineStyle = {
		sticky: {
			top: '0',
			position: 'sticky',
			zIndex: 5,
			background: 'rgba(255, 255, 255, 0.99)',
			width: '100%', height: '100%',
			transition: 'background 0.5s ease',
			margin: '-10px auto 0 auto',
			boxShadow: '0px 4px 40px 0px rgba(0,0,0,0.4)',
		},
		notSticky: {
			positio: 'relative',
			width: '100%',
			height: '100%',
			margin: '0 auto',
			transition: 'background 0.5s ease',
			background: 'rgba(229, 654, 149, 0.99)',
		},
	};
	const location = useLocation()
	const isSticky = () => {
		window.scrollY > 0 ? setSticky(true) : setSticky(false);
	};
	useEffect(() => {
		window.addEventListener('scroll', isSticky);
		return () => {
			window.removeEventListener('scroll', isSticky);
		};
	});

	return (
		<div // @ts-expect-error
			style={sticky ? { ...inlineStyle.sticky } : { ...inlineStyle.notSticky }}>
			<Container p={20} size="xl">
				<Group position="apart">
					<NavLink to="/">
						<Text color={'teal'} sx={{ fontFamily: 'fantasy' }} weight={500} size={28}>
							Online Shop
						</Text>
					</NavLink>
					<Group>
						{totalCount.count !== 0 && location.pathname !== '/shopping-bag' && <Group><Text>View bag</Text> <ArrowRightIcon /></Group>}
						<NavLink to={'/shopping-bag'}>
							<Indicator
								label={totalCount.count}
								showZero={false}
								dot={false}
								color={'lime'}
								overflowCount={999}
								inline
								size={22}>
								<BackpackIcon width={28} height={28} />
							</Indicator>
						</NavLink>
					</Group>
				</Group>
			</Container>
		</div>
	);
};

export default Header;
