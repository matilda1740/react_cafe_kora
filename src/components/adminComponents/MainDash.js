import React, { useEffect, useState } from 'react'
import { ArrowDownward, ArrowUpward, CancelOutlined, CheckCircleOutline } from '@material-ui/icons'
import { Link } from 'react-router-dom';
import { getTotalCustomers, getTotalTeam} from '../reducer';
import { useStateValue } from '../StateProvider';

export default function MainDash({customers, team}) {
    const [ { users }, dispatch] = useStateValue();

    return (
        <>
        <div className="welcome_bar">
            <h4 className="welcome_text">Main Dashboard</h4>
            <p className="welcome_ptag">last seen 24th January 2056</p>
        </div>

        <div className="display_area">

            <div className="display_area_left">
                <Link to="/admin/customers" className="display_box">
                       <h4 className="display_box_title">Customers</h4>
                    <p className="display_box_number">50
                    </p>
                    <div className="display_growth">
                        <ArrowUpward className="growth_icon upward"/> 5.5 %
                    </div>                 
                </Link>
                <Link to="/admin/team" className="display_box">
                    <h4 className="display_box_title">CF Team</h4>
                    <p className="display_box_number">30</p>
                    <div className="display_growth">
                        <ArrowDownward className="growth_icon downward"/> 1.89 %
                    </div>
                </Link>

                <Link to="/admin/products" className="display_box">
                    <h4 className="display_box_title">Products</h4>
                    <p className="display_box_number">39, 877</p>
                    <div className="display_growth">
                        <ArrowDownward className="growth_icon downward"/> 2.73 %
                    </div>
                </Link>

                <Link to="/admin/orders" className="display_box">
                    <h4 className="display_box_title">Orders</h4>
                    <p className="display_box_number">65, 871</p>
                    <div className="display_growth">
                        <ArrowUpward className="growth_icon upward"/> 0.12 %
                    </div>
                </Link>
            </div>
        
            <div className="display_area_right">
                <div className="rev_box"></div>
            </div> 
        </div>            
        </>
    )
}
