import React, {useEffect, useState} from 'react';
import './style.css';
import {Layout, Menu, Breadcrumb, Icon, Card, Meta, Result} from 'antd';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Announce} from "../../components/annonce";
import * as CONSTANTS from "../../shared/constants";
import {message} from 'antd';

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;


export default function DashBoard() {

    const [isCollpased, setCollapsed] = useState(false)
    const onCollapse = collapsed => {
        console.log(collapsed);
        setCollapsed(collapsed)
    };
    const [currentAnnonce, setCurrentAnnonces] = useState([]);
    const fetchVehicles = () => {
        fetch(CONSTANTS.API_URL + "vehicles/getunconfirmed.php")
            .then(response => {
                return response.json();
            })
            .then(data => {
                // let marquesFromApi =data.records.map(entry => entry)

                if (data.records) {

                    setCurrentAnnonces(data.records)
                } else {
                    setCurrentAnnonces([])
                }
            })
            .catch(error => {
                setCurrentAnnonces([])
            });
    }
    useEffect(() => {
        fetchVehicles();
    });
    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={isCollpased} onCollapse={onCollapse}>
                <div className="logo"/>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1">
                        <Icon type="pie-chart"/>
                        <span>Annonces</span>
                    </Menu.Item>
                    *
                </Menu>
            </Sider>
            <Layout>
                <Header style={{background: '#fff', padding: 0}}/>
                <Content style={{margin: '0 16px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item>annonces</Breadcrumb.Item>
                    </Breadcrumb>

                    <Container>

                        <Row className={"justify-content-center"}>


                            {currentAnnonce.length > 0 ? currentAnnonce.map(entry => (
                                <Col
                                    className={"p-2"}
                                    key={entry.id}
                                    xs={12} md={6} lg={4}
                                >
                                    <Card
                                        style={{width: '100%'}}

                                        actions={[
                                            <Icon onClick={() => {
                                                fetch(CONSTANTS.API_URL + "vehicles/confirm.php?id=" + entry.id)
                                                    .then(response => {
                                                        return response.json();
                                                    })
                                                    .then(data => {
                                                        // let marquesFromApi =data.records.map(entry => entry)
                                                        message.success("Confirmed");
                                                        fetchVehicles();
                                                    })
                                                    .catch(error => {
                                                        message.error("Erreur");
                                                    });

                                            }} type="file-add" key="file-add"/>,
                                        ]}
                                    >
                                        <Announce
                                            name={entry.name}
                                            type={entry.carburant}
                                            color={entry.color}
                                            chv={entry.chv}
                                            price={entry.price}
                                            img={entry.img_cover}
                                            id={entry.id}
                                        />
                                    </Card>


                                </Col>
                            )) : <Result
                                icon={<Icon type="smile" theme="twoTone"/>}
                                title="Great, we have done all the operations!"
                            />}


                        </Row>
                    </Container>

                </Content>
                <Footer style={{textAlign: 'center'}}></Footer>
            </Layout>
        </Layout>
    );

}




