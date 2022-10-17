import { Badge, Group, Stack, Text } from "@mantine/core";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";

const ProductRating = ({ rate, count }: { rate: number, count: number }) => {
	const countRating = () => {
		const rateArray = [];
		for (let i = 0; i < 5; i++) {
			if (i < Math.round(rate)) {
				rateArray.push({ isRated: true });
			} else {
				rateArray.push({ isRated: false });
			}
		}
		return rateArray;
	};

	return (
		<Stack my="lg" align="center">
			<Group spacing={5}>
				{countRating().map((item, index) => {
					return item.isRated ? (
						<StarFilledIcon
							width={20}
							height={20}
							color="#09510a"
							stroke={"green"}
							key={index}
						/>
					) : (
						<StarIcon stroke={"green"} width={20} height={20} key={index} />
					);
				})}
			</Group>
			<Group align={"center"}>
				<Text weight={500} color="cyan" size="xl">
					Reviews count:
				</Text>
				<Badge
					size="xl"
					variant="gradient"
					gradient={{ from: "violet", to: "red" }}>
					{count}
				</Badge>
			</Group>
		</Stack>
	);
};

export default ProductRating;
