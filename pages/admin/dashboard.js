import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { AdminSelector } from '../../redux/selector/admin';
import Categorys from './dashboardViews/categorys';
import Images from './dashboardViews/images';
import Overviews from './dashboardViews/overviews';
import Profile from './dashboardViews/profile';
import Systems from './dashboardViews/systems';

function Dashboard(props) {
    const admin = useSelector(AdminSelector.Admin);
    const [views, setViews] = useState("Overviews");

    const RenderViewsDashboard = () => {
        switch (views) {
            case "Systems": {
                return <Systems />

            }
            case "Categorys": {
                return <Categorys />

            }
            case "Images": {
                return <Images />

            }
            case "Profile": {
                return <Profile />

            }

            default:
                return <Overviews />

        }
    }
    return (
        <div id='dashboard'>
            <Container>
                <div className='dashboard_content'>
                    <div className='dashboard_main'>
                        <div className='dashboard_admin'>
                            <div className='avatar'>
                                <img src={admin.avatar} alt={admin.userName} />
                            </div>
                            <h4>
                                <i class="fa fa-user"></i>
                                {admin.userName}
                            </h4>
                            <h4>
                                <i class="fab fa-flickr"></i>
                                {admin.type}
                            </h4>
                        </div>
                        <div className='dashboard_controller'>
                            <div className='controller_item'>
                                <Button onClick={() => setViews("Overviews")}>Overviews</Button>
                            </div>
                            <div className='controller_item'>
                                <Button onClick={() => setViews("Systems")}>Systems</Button>
                            </div>
                            <div className='controller_item'>
                                <Button onClick={() => setViews("Categorys")}>Categorys</Button>
                            </div>
                            <div className='controller_item'>
                                <Button onClick={() => setViews("Images")}>Images</Button>
                            </div>
                            <div className='controller_item'>
                                <Button onClick={() => setViews("Profile")}>Profile</Button>
                            </div>
                        </div>
                    </div>
                    <div className='dashboard_views'>
                        {
                            RenderViewsDashboard()
                        }
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Dashboard;