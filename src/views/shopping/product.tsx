/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import { ActionIcon, Badge, Group, Skeleton, Stack, Text } from "@mantine/core";
import { TrashIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { removeProduct } from "../../redux/reducer/count-slice";

const ShoppingProd = ({ id, price, count }: { id: number, price: number, count: number }) => {
    const [product, setProduct] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch()
    const removeItem = () => {
        dispatch(removeProduct({ count, price, id }))
    }
    useEffect(() => {
        setIsLoading(true);
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then((res) => res.json())
            .then((json) => {
                setProduct(json);
                setIsLoading(false);
                console.log({ json })
            });
    }, []);

    return isLoading ? <Skeleton width={600} height={209}></Skeleton> : <Group align={'center'} p={'xl'} sx={{ border: '1px solid green', borderRadius: '8px' }}>
        <img width={80} height={80} style={{ objectFit: 'contain', margin: '0 auto' }} src={product?.image} />
        <Stack align={'flex-start'}>
            <Text> <span style={{ fontWeight: 500 }}>Title:</span> {product?.title.substring(0, 30)}...</Text>
            <Text><span style={{ fontWeight: 500 }}>Price:</span> ${price}</Text>
            <Group align={'center'}>
                <Text weight={500}>Category: </Text><Badge>{product?.category}</Badge>
            </Group>
            <Group align={'center'}>
                <Text weight={500}>Count: </Text><Badge size="lg" color={'grape'}>{count}</Badge>
            </Group>
        </Stack>
        <ActionIcon onClick={() => removeItem()} color={'red'} size="xl"><TrashIcon height={24} width={24} color="red" /></ActionIcon>
    </Group>
}

export default ShoppingProd