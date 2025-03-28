import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
    padding:0 20px;
    max-width:480px;
    margin:0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content:center;
    align-items: center;

`;

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: white;
    color : ${(props) =>  props.theme.bgColor};
    border-radius:15px;
    margin-bottom: 10px;
    a{
        padding: 20px;
        align-items: center;
        display: flex;
        color: ${(props) => props.theme.textColor};
        transition: color 0.2s ease-in;
    }

    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
`;

const Loader = styled.div`
    text-align:center;
`;

const Img = styled.img`
    width:35px;
    height:35px;
    margin-right: 10px;
`;

const Title = styled.h1`
    font-size:48px;
    color: ${(props) =>  props.theme.accentColor};
`;

interface ICoin {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;

}

interface ICoinsProps {
}

function Coins({}: ICoinsProps){
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
    const { isLoading, data} = useQuery<ICoin[]>({
                                queryKey: ['allCoins'],
                                queryFn: fetchCoins });
    // const [coins, setCoins] = useState<CoinInterface[]>([]);
    // const [loading, setLoading] = useState(true);
    // useEffect(()=>{
    //     (async () =>{
    //         const response = await fetch("https://api.coinpaprika.com/v1/coins");
    //         const json = await response.json();           
    //         setCoins(json.slice(0, 100));
    //         setLoading(false);
    //     })()
    // },[]);

    return(
        <Container>
            <Header>
                <Title>코인</Title>
                <button onClick={toggleDarkAtom}>Toggle Mode</button>
            </Header>
            {isLoading ? (
                <Loader>Loading....</Loader>
            ):(
            <CoinsList>
                {data?.slice(0, 100).map((coin) => (
                    <Coin key={coin.id}>
                        <Link to={{
                            pathname: `/${coin.id}`,
                            state: {name: coin.name}
                        }}>
                            <Img src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`}/>
                            {coin.name} &rarr;
                        </Link>
                    </Coin>
                ))}
            </CoinsList>
            )}
        </Container>
    );
}

export default Coins;