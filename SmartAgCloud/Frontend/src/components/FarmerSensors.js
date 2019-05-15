import React, { Component } from "react";
import axios from "axios";
import Sidebar from "./Sidebar.js";
import { fetchNode } from "../actions";
import { fetchFarmerSensors } from "../actions";
import { postCourse } from "../actions";
import { regCourse } from "../actions";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class FarmerSensors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course_name: "",
      course_dept: "",
      course_desc: "",
      course_room: "",
      course_capacity: "",
      course_waitlist: "",
      course_term: "",
      isHidden: false,
      regCourseName: ""
    };
  }
  componentDidMount() {
    this.props.fetchFarmerSensors("1");
    console.log("props for course component:", this.props);
  }
  onCourseNameChange = e => {
    this.setState({
      course_name: e.target.value
    });
  };
  onCourseDeptChange = e => {
    this.setState({
      course_dept: e.target.value
    });
  };
  onCourseDescChange = e => {
    this.setState({
      course_desc: e.target.value
    });
  };
  onCourseRoomChange = e => {
    this.setState({
      course_room: e.target.value
    });
  };
  onCourseCapacityChange = e => {
    this.setState({
      course_capacity: e.target.value
    });
  };
  onCourseWaitlistChange = e => {
    this.setState({
      course_waitlist: e.target.value
    });
  };
  onCourseTermChange = e => {
    this.setState({
      course_term: e.target.value
    });
  };

  onSelectChange = e => {
    console.log("??????????????????????????????");
    console.log("Selected course:", e.target.value);
    this.setState({
      regCourseName: e.target.value
    });
  };

  //Faculty
  renderAddCourse = () => {
    console.log("INSIDE renderAddCourse!");
    console.log(
      "is_faculty from store inside Course view:",
      this.props.is_faculty
    );
    if (this.props.is_faculty === "yes") {
      return (
        <div>
          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-5 border border-primary">
              <form method="post">
                <input
                  type="text"
                  onChange={this.onCourseNameChange}
                  placeholder="Course Name"
                  required
                />
                <br />
                <input
                  type="text"
                  onChange={this.onCourseDeptChange}
                  placeholder="Course Dept"
                  required
                />
                <br />
                <input
                  type="text"
                  onChange={this.onCourseDescChange}
                  placeholder="Course Description"
                  required
                />
                <br />
                <input
                  type="text"
                  onChange={this.onCourseRoomChange}
                  placeholder="Course Room"
                  required
                />
                <br />
                <input
                  type="text"
                  onChange={this.onCourseCapacityChange}
                  placeholder="Course Capacity"
                  required
                />
                <br />
                <input
                  type="text"
                  onChange={this.onCourseWaitlistChange}
                  placeholder="Course Waitlist"
                  required
                />
                <br />
                <input
                  type="text"
                  onChange={this.onCourseTermChange}
                  placeholder="Course Term"
                  required
                />
                <br />
                <input
                  type="submit"
                  onClick={this.onSubmitHandler}
                  value="Add Course"
                  className="btn btn-md btn-success"
                />
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  };

  //Student
  renderRegCourse = () => {
    console.log("INSIDE renderAddCourse!");
    console.log(
      "is_faculty from store inside Course view:",
      this.props.is_faculty
    );
    if (this.props.is_faculty === "no") {
      return (
        <div>
          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-5 border border-primary">
              <form method="post">
                {/* <input type="text" onChange={this.onCourseDeptChange} placeholder="Course Dept" required/><br/> */}
                <div class="form-group">
                  <label for="exampleFormControlSelect1">Example select</label>
                  <select
                    class="form-control"
                    id="exampleFormControlSelect1"
                    onClick={this.onSelectChange}
                  >
                    {this.returnSelect()}
                  </select>
                </div>
                <input
                  type="submit"
                  onClick={this.onRegSubmitHandler}
                  value="Reg Course"
                  className="btn btn-md btn-success"
                />
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  };

  returnSelect = () => {
    let course_options = this.props.allCourses.map(eachCourse => {
      return <option>{eachCourse.course_name}</option>;
    });
    return course_options;
  };

  //Faculty
  renderButtonAddCourse = () => {
    if (this.props.is_faculty === "yes") {
      return (
        <div>
          <button onClick={this.toggleForm} className="btn btn-success">
            Add a New Course
          </button>
        </div>
      );
    } else {
      return <div />;
    }
  };

  //Student
  renderButtonRegCourse = () => {
    if (this.props.is_faculty === "no") {
      return (
        <div>
          <button onClick={this.toggleForm} className="btn btn-success">
            Register for Course
          </button>
        </div>
      );
    } else {
      return <div />;
    }
  };

  toggleForm = () => {
    this.setState({
      isHidden: !this.state.isHidden
    });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    console.log("userId in params:", this.props.match.params.userId);
    let userId = this.props.match.params.userId;
    let data = {
      id: this.props.match.params.userId,
      isFaculty: this.state.isFaculty,
      course_name: this.state.course_name,
      course_dept: this.state.course_dept,
      course_desc: this.state.course_desc,
      course_room: this.state.course_room,
      course_capacity: this.state.course_capacity,
      course_waitlist: this.state.course_waitlist,
      course_term: this.state.course_term
    };
    this.props.postCourse(data, () => {
      this.props.history.push(`/users/${data.id}/courses`);
    });
  };

  onRegSubmitHandler = e => {
    e.preventDefault();
    console.log("userId in params:", this.props.match.params.userId);
    let userId = this.props.match.params.userId;
    let data = {
      id: this.props.match.params.userId,
      isFaculty: this.state.isFaculty,
      regCourse: this.state.regCourseName
    };
    this.props.regCourse(data, () => {
      this.props.history.push(`/users/${data.id}/courses`);
    });
  };

  render() {
    let props = {
      userid: this.props.match.params.id,
      is_faculty: this.props.is_faculty
    };
    console.log("PROPS in Course View:", this.props);
    console.log("All Courses:", this.props.allCourses);
    const enrolledAs = this.props.is_faculty === "yes" ? "Faculty" : "Student";
    console.log(
      "is_faculty from props in All Courses page:",
      this.props.is_faculty
    );
    console.log("courses in course page:", this.props.courses);
    const farmerSensorItems = this.props.farmer_sensors.map(eachSensor => {
      let spinner_class = eachSensor.status === "on" ? "led-green" : "led-red";
      return (
        <tr>
          {/* <td><NavLink to={{pathname:`/users/${this.props.match.params.userId}/courses/${eachCourse._id}`}} >{eachCourse.course_name}</NavLink></td> */}
          <td>{eachSensor.ID}</td>
          <td>
            <div class={spinner_class} />
          </td>
          <td>{eachSensor.data.value}</td>
        </tr>
      );
    });
    return (
      <div>
        <div className="container">
          <Sidebar />
          {/* <Sidebar {...props}/> */}
          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-9">
              <br />
              <table class="table table-bordered">
                <thead>
                  <tr className="centered-header">
                    <th scope="col">Sensor ID</th>
                    <th scope="col">Sensor Status</th>
                    <th scope="col">Sensor Data</th>
                  </tr>
                </thead>
                <tbody>{farmerSensorItems}</tbody>
              </table>
              <br />
              <br />
              {/* {this.renderButtonAddCourse()}<br/>
                            {this.renderButtonRegCourse()}<br/>
                            {this.state.isHidden && this.renderAddCourse()}
                            {this.state.isHidden && this.renderRegCourse()} */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const matchStateToProps = state => ({
  farmer_sensors: state.farmer_sensors
});

export default connect(
  matchStateToProps,
  { fetchFarmerSensors }
)(FarmerSensors);
