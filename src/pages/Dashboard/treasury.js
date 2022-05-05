import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Chart } from "react-charts"
// import useTreasuryConfig from "./components/chart/useTreasuryConfig"
import Collapsible from "react-collapsible";
import Tdata from "./components/coustomChart/totalTreasury"
import Wdata from "./components/coustomChart/workableTreasury"
import Hdata from "./components/coustomChart/holdableTreasury"
import Bdata from "./components/coustomChart/BackingTreasury"
// import DeBankOpenApi from "debank-open-api";


const TotalContainer = styled.div`
  background: linear-gradient(311.99deg, rgba(0, 0, 0, 0.3) -22.55%, rgba(255, 255, 255, 0.3) 131.34%), #2c2c3dcc;
  background-blend-mode: soft-light, normal;
  border-radius: 10px;
  position: relative;
  width: 70%;
  height: 40vh;
  min-height: 250px;
  @media (max-width: 760px) {
    width: 90%;
    height: 42vh;
  }
`

const TreasuryContainer = styled.div`
  background: linear-gradient(311.99deg, rgba(0, 0, 0, 0.3) -22.55%, rgba(255, 255, 255, 0.3) 131.34%), #2c2c3dcc;
  background-blend-mode: soft-light, normal;
  position: relative;
  width: 100%;
  height: 38vh;
  min-height: 250px;
  @media (max-width: 760px) {
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
    // const { Tdata } = useTreasuryConfig({
    //     Tseries: 2
    // });

    // console.log('chart_data', Tdata);



    // const apiInstance = new DeBankOpenApi.UserApi();
    // const id = "0xe4F0092135280A171f66CEE1cE81F1a6Ef38dF28"; // String | User Address

    // apiInstance.getUserTotalBalance_1(id).then((response) => {
    //     console.log(response);
    // }, (error) => {
    //     console.error(error);
    // });


    const Tseries = React.useMemo(
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

    const options = [
        'one', 'two', 'three'
    ];
    const defaultOption = options[0];
    return (
        <>
            <div style={{ width: "100%", position: "relative", height: "100%", flexFlow: "column", justifyContent: "center" }}>

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

                <div
                    style={{ position: "relative", top: "25vh", justifyContent: "space-around", marginBottom: "25px", textAlign: "center" }}>

                    <p style={{ fontSize: "18px", color: "white", fontFamily: "sans-serif" }}>
                        Current Investment
                     </p>
                    <div style={{ display: "flex", justifyContent: "space-evenly", padding: "20px 0" }}>
                        <p style={{ display: "flex", fontSize: "15px", color: "#a09c9c" }}>
                            Balance  <p style={{ marginLeft: "5px", color: "white" }}>$</p>
                        </p>
                        <p style={{ display: "flex", fontSize: "15px", color: "#a09c9c" }}>
                            Daily Revenue  <p style={{ marginLeft: "5px", color: "white" }}>$</p>
                        </p>
                        <p style={{ display: "flex", fontSize: "15px", color: "#a09c9c" }}>
                            Monthly Revenue  <p style={{ marginLeft: "5px", color: "white" }}>$</p>
                        </p>
                    </div>
                </div>


                <div
                    style={{ position: "relative", width: "100%", top: "20vh", marginBottom: "25px", overflowY: "auto" }}>
                    <div className="pt-3 text-white flex items-center justify-between"
                        style={{ display: "flex", width: "100%", flexDirection: "column" }}
                    >
                        <TotalContainer style={{ padding: "10px", marginBottom: "20px" }}
                            className="dark-box-shadow"
                        >
                            <span style={{ display: "flex", color: "#44c42d", fontSize: "18px", letterSpacing: "1px" }}>Total Treasury</span>
                            <p style={{ display: "flex", fontSize: "18px", color: "white", paddingBottom: "3px" }}>
                                $ 3,272.66
                            </p>
                            <div style={{ width: "100%", height: "30vh" }}>
                                <Chart data={Tdata} series={Tseries} axes={Maxes} tooltip />
                                {/* </ResizableBox> */}
                            </div>
                        </TotalContainer>

                        <Collapsible trigger="Workable Treasury">
                            <TreasuryContainer style={{ padding: "10px" }}
                                className="dark-box-shadow"
                            >
                                {/* <span style={{ display: "flex", color: "#44c42d", fontSize: "18px", letterSpacing: "1px" }}>Workable Treasury</span> */}
                                <p style={{ display: "flex", fontSize: "18px", color: "white", paddingBottom: "3px" }}>
                                    $ 3,194.62
                            </p>
                                <div style={{ width: "100%", height: "30vh" }}>
                                    <Chart data={Wdata} series={Tseries} axes={Maxes} tooltip />
                                    {/* </ResizableBox> */}
                                </div>
                            </TreasuryContainer>
                        </Collapsible>

                        <Collapsible trigger="Holdable Treasury">
                            <TreasuryContainer style={{ padding: "10px" }}
                                className=" dark-box-shadow"
                            >
                                {/* <span style={{ display: "flex", color: "#44c42d", fontSize: "18px", letterSpacing: "1px" }}>Holdable Treasury</span> */}
                                <p style={{ display: "flex", fontSize: "18px", color: "white", paddingBottom: "3px" }}>
                                    $ 78,04
                            </p>
                                <div style={{ width: "100%", height: "30vh" }}>
                                    <Chart data={Hdata} series={Tseries} axes={Maxes} tooltip />
                                    {/* </ResizableBox> */}
                                </div>
                            </TreasuryContainer>
                        </Collapsible>

                        <Collapsible trigger="Backing Treasury">
                            <TreasuryContainer style={{ padding: "10px" }}
                                className=" dark-box-shadow"
                            >
                                {/* <span style={{ display: "flex", color: "#44c42d", fontSize: "18px", letterSpacing: "1px" }}>Holdable Treasury</span> */}
                                <p style={{ display: "flex", fontSize: "18px", color: "white", paddingBottom: "3px" }}>
                                    $ 0
                            </p>
                                <div style={{ width: "100%", height: "30vh" }}>
                                    <Chart data={Bdata} series={Tseries} axes={Maxes} tooltip />
                                    {/* </ResizableBox> */}
                                </div>
                            </TreasuryContainer>
                        </Collapsible>



                    </div>
                </div>
            </div>
        </>
    )
}
