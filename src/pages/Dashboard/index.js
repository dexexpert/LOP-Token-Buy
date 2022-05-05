import React from 'react'
import ReactDom from 'react-dom';
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ProgressBar } from "react-progressbar-fancy";
import { Chart } from "react-charts";
import useMarketcapConfig from "./components/chart/useMarketcapConfig";
import useTreasuryConfig from "./components/chart/useTreasuryConfig";
import useLagRadar from "./components/chart/useLagRadar";
import Tdata from "./components/coustomChart/totalTreasury";
import Mdata from "./components/coustomChart/totalMarketcap";

import Metric from './components/metric'

const TradContainer = styled.div`
  background: linear-gradient(311.99deg, rgba(0, 0, 0, 0.3) -22.55%, rgba(255, 255, 255, 0.3) 131.34%), #2c2c3dcc;
  background-blend-mode: soft-light, normal;
  border-radius: 15px;
  position: relative;
  width: 45%;
  height: 40vh;
  padding: 10px;
  @media (max-width: 760px) {
    width: 80%;
    height: 42vh;
    margin-top:4vh
  }
  
`

const OverContainer = styled.div`
  background: linear-gradient(311.99deg, rgba(0, 0, 0, 0.3) -22.55%, rgba(255, 255, 255, 0.3) 131.34%), #2c2c3dcc;
  background-blend-mode: soft-light, normal;
  border-radius: 15px;
  position: relative;
  width: 60%;
  height: 10vh;
  margin-bottom: 15px;
  left: 20%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  @media (max-width: 760px) {
    width: 80%;
    left: 10%;
    height:13vh;
  }
`

const paths = [
    {
        path: '/dashboard',
        label: 'Overview',
    },
    {
        path: '/dashboard/treasury',
        label: 'Treasury',
    }
]
export default function DashboardPage() {

    // useLagRadar();
    // --------------------Marketcap----------------
    // const { Mdata } = useMarketcapConfig({
    //     Mseries: 1
    // });
    // console.log(Mdata)

    const Mseries = React.useMemo(
        () => ({
            type: "area"
        }),
        []
    );

    const Maxes = React.useMemo(
        () => [
            { primary: true, position: "bottom", type: "time" },
            { position: "left", type: "linear", stacked: true }
        ],
        []
    );
    // ------------------Treasury---------------
    // const { Tdata } = useTreasuryConfig({
    //     Tseries: 2
    // });

    const Tseries = React.useMemo(
        () => ({
            type: "area"
        }),
        []
    );



    const Taxes = React.useMemo(
        () => [
            { primary: true, position: "bottom", type: "time" },
            { position: "left", type: "linear", stacked: true }
        ],
        []
    );

    return (
        <>
            <div style={{
                width: "100%", position: "relative", display: "flex", height: "100% !important", flexFlow: "column", justifyContent: "center"
            }}>
                <div className="dark-box-shadow"
                    style={{ position: "absolute", top: "15vh", left: "50%", transform: "translate(-50%, 0)", width: "40vh", display: "flex", justifyContent: "space-around", marginBottom: "25px", borderBottom: "5px solid #44c42d", borderRadius: "20px", padding: "0px 15px 0px 15px " }}>

                    {
                        paths.map((item, index) =>

                            <Link key={index} style={{ color: "#44c42d", fontSize: "20px", letterSpacing: "1.5px" }} to={item.path}>{item.label}</Link>
                        )
                    }
                    {/* <a href="https://www.w3schools.com" style={{ color: "#44c42d", fontSize: "20px", letterSpacing: "1.5px" }}>Overview</a>

                <a style={{ color: "#44c42d", fontSize: "20px", letterSpacing: "1.5px" }}>Treasury</a> */}
                </div>

                <div style={{ position: "relative", top: "25vh" }}>
                    {/* <span style={{ color: "#44c42d", fontSize: "20px", letterSpacing: "1px" }}>Goal to 500K</span> */}

                    <ProgressBar
                        className="space"
                        label={"Goal to 500K"}
                        progressColor={"green"}
                        darkTheme
                        score={0.6}
                    />
                    <OverContainer
                        className=" dark-box-shadow"
                    >
                        <Metric title='Market Cap' value='$ 3,618' />
                        {/* <Metric title='OHM Price' value='$39.74' /> */}
                        <Metric title='Circulating Supply (total)' value='201' />
                        {/* <Metric title='Liquid Backing per OHM' value='$23.50' /> */}

                    </OverContainer>

                    <div className="pt-3 text-white flex items-center justify-around dashboard-card"
                        style={{ display: "flex", width: "100%", padding: "1% 3%", position: "relative" }}
                    >
                        <TradContainer
                            className="dark-box-shadow"
                        >

                            <span style={{ display: "flex", color: "#44c42d", fontSize: "18px", letterSpacing: "1px" }}>Total Market Cap</span>
                            <p style={{ display: "flex", fontSize: "18px", color: "white", paddingBottom: "3px" }}>
                                $ 3,618
                            </p>
                            <div style={{ height: "30vh" }}>
                                <Chart data={Mdata} series={Mseries} axes={Maxes} tooltip />
                                {/* </ResizableBox> */}
                            </div>

                        </TradContainer>
                        <TradContainer
                            className="dark-box-shadow"
                        >

                            <span style={{ display: "flex", color: "#44c42d", fontSize: "18px", letterSpacing: "1px" }}>Total Treasury</span>
                            <p style={{ display: "flex", fontSize: "18px", color: "white", paddingBottom: "3px" }}>
                                $ 3,272.66
                            </p>
                            <div style={{ height: "30vh" }}>
                                <Chart data={Tdata} series={Tseries} axes={Taxes} tooltip />
                            </div>
                        </TradContainer>
                    </div>
                </div>
            </div>
        </>
    )
}
