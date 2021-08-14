import React from 'react'
import { ArrowDownward, ArrowUpward } from '@material-ui/icons'
import { Link } from 'react-router-dom';

export default function MainDash({customers, team}) {
    return (
        <>
        <div className="welcome_bar">
            <h4 className="welcome_text">
                Main Dashboard
            </h4>
            <p className="welcome_ptag">last seen 24th January 2056</p>
            
        </div>
        <div className="display_area">

            <div className="display_area_left">
                <Link to="/admin/customers" className="display_box">
                       <h4 className="display_box_title">Customers</h4>
                    <p className="display_box_number">45,000
                        {/* { customers?.length } */}
                    </p>
                    <div className="display_growth">
                        <ArrowUpward className="growth_icon upward"/> 5.5 %
                    </div>                 
                </Link>
                <Link to="/admin/team" className="display_box">
                    <h4 className="display_box_title">CF Team</h4>
                    <p className="display_box_number">12, 713</p>
                    <div className="display_growth">
                        <ArrowDownward className="growth_icon downward"/> 1.89 %
                    </div>
                </Link>

                <div className="display_box">
                    <h4 className="display_box_title">Earnings</h4>
                    <p className="display_box_number">39, 877</p>
                    <div className="display_growth">
                        <ArrowDownward className="growth_icon downward"/> 2.73 %
                    </div>
                </div>
                <div className="display_box">
                    <h4 className="display_box_title">Growth</h4>
                    <p className="display_box_number">65, 871</p>
                    <div className="display_growth">
                        <ArrowUpward className="growth_icon upward"/> 0.12 %
                    </div>
                </div>
            </div>
        
            <div className="display_area_right">
                <div className="rev_box"></div>
            </div> 
        </div>            
        </>
    )
}
