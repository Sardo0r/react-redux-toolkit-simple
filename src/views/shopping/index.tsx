import { Badge, Button, Card, Container, Group, Stack, Text } from "@mantine/core"
import { NavLink } from "react-router-dom"
import { useAppSelector } from "../../redux/hooks"
import ShoppingProd from "./product"

const ShoppingBag = () => {
    const products = useAppSelector(state => {
        return state.count.products
    })
    const total = useAppSelector(state => {
        let count = state.count.products.reduce((total, current) => {
            return total + current.count
        }, 0)
        let price = state.count.products.reduce((total, current) => {
            return total + current.count * current.price
        }, 0)
        return { count, price }
    })
    return (
        <Container my={40} size={'xl'}>
            <Group align={'center'} sx={(theme) => ({
                [theme.fn.smallerThan('lg')]: { flexDirection: "column-reverse", alignItems: 'center', gap: 40 }
            })} position="apart">
                {total.count !== 0 && <Stack sx={{ maxWidth: '600px', width: '100%' }}>
                    {products.map((item: any) => {
                        return (
                            <ShoppingProd key={item?.id} {...item} />
                        )
                    })}
                    <Button color={'green'} variant="gradient">Buy</Button>
                </Stack>}
                {total.count !== 0 ? <Card sx={{ maxWidth: '400px', width: '100%' }} shadow={'lg'} withBorder>
                    <Stack align={'start'}>
                        <Text color={'blue'} size={22} weight={600}>Info</Text>
                        <Group align={'center'}>
                            <Text weight={500}>Total price: </Text><Badge color="green" size="lg">{total?.price}</Badge>
                        </Group>
                        <Group align={'center'}>
                            <Text weight={500}>Total products count: </Text><Badge color="green" size="lg">{total?.count}</Badge>
                        </Group>
                    </Stack>
                </Card> : <Stack sx={{ margin: '40px auto' }} spacing={40}>
                    <Text size={24} weight={500}>Your bag is empty</Text>
                    <span>(˘･_･˘)</span>
                    <NavLink to="/">
                        <Button color={'gray'} variant="filled">Keep shopping</Button>
                    </NavLink>
                </Stack>}
            </Group>
        </Container>
    )
}

export default ShoppingBag