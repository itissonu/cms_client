import React from 'react'
import ProfileOutlet from './ProfileOutlet';
import ProfilePage from '../Pages/ProfilePage';
import ProfileFullDetails from '../Pages/ProfileFullDetails';
import BlogProfile from '../Pages/BlogProfile';
import TimeTable from '../Pages/TimeTable';
import AddBlog from '../Pages/AddBlog';
import SingleBlog from '../Pages/SingleBlog';
import UpdateBlog from '../Pages/UpdateBlog';
import AttendenceOverview from '../Pages/AttendenceOverview';
import References from '../Pages/References';
import ReferenceVideo from '../Pages/ReferenceVideo';
import { Route, Routes, } from 'react-router-dom';

const StudentLayout = () => {
    console.log("okkkkk")
    return (
        <Routes>

            <Route
                element={<ProfileOutlet />}
            >
                <Route  path="/" element={<ProfilePage />} />
                <Route exact path="/details/:id" element={<ProfileFullDetails />} />
                <Route exact path="/myblogs" element={<BlogProfile />} />
                <Route exact path="/mytimetable" element={<TimeTable />} />
                <Route exact path="/myblogs/addblog" element={<AddBlog />} />
                <Route exact path="/myblogs/:id" element={<SingleBlog />} />
                <Route exact path="/myblogs/update/:id" element={<UpdateBlog />} />
                <Route exact path="/overview" element={<AttendenceOverview />} />
                <Route exact path="/referances/article" element={<References />} />
                <Route exact path="/referances/video" element={<ReferenceVideo />} />
            </Route>
        </Routes>
    );
}

export default StudentLayout