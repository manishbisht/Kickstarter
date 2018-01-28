import React, {Component} from 'react';

import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import Project from './Project';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiData: [],
            projectNames: [],
            projects: [],
            sort: 'none'
        };

        this.search = this.search.bind(this);
        this.handleSort = this.handleSort.bind(this);
    }

    componentDidMount() {
        var self = this;

        fetch('http://starlord.hackerearth.com/kickstarter')
            .then(
                function (response) {
                    if (response.status !== 200) {
                        return;
                    }

                    // Examine the text in the response
                    response.json().then(function (data) {
                        data.shift();
                        console.log(data);
                        self.setState({
                            apiData: data,
                            projects: data
                        });
                    });
                }
            )
            .catch(function (err) {
            });
    }

    search(query) {
        var projects = [];
        var projectNames = [];

        this.state.apiData.forEach(function (project) {
            if (project.title.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                projects.push(project);
                projectNames.push(project.title);
            }
        });

        this.setState({
            projects: projects,
            projectNames: projectNames,
        });
    }

    handleSort(event, index, value) {
        console.log(value);
        var projects = [];
        if (value === 'percenatge-asc') {
            if (this.state.sort === 'percenatge-dsc') {
                projects = this.state.projects.reverse();
            } else {
                projects = this.state.apiData.sort(function (a, b) {
                    return parseInt(a['percentage.funded'], 10) - parseInt(b['percentage.funded'], 10);
                });
            }
        } else if (value === 'percenatge-dsc') {
            if (this.state.sort === 'percenatge-asc') {
                projects = this.state.projects.reverse();
            } else {
                projects = this.state.apiData.sort(function (a, b) {
                    return parseInt(b['percentage.funded'], 10) - parseInt(a['percentage.funded'], 10);
                });
            }
        } else if (value === 'time-asc') {
            if (this.state.sort === 'time-dsc') {
                projects = this.state.projects.reverse();
            } else {
                projects = this.state.apiData.sort(function (a, b) {
                    return new Date(a['end.time']) - new Date(b['end.time']);
                });
            }
        } else if (value === 'time-dsc') {
            if (this.state.sort === 'time-asc') {
                projects = this.state.projects.reverse();
            } else {
                projects = this.state.apiData.sort(function (a, b) {
                    return new Date(b['end.time']) - new Date(a['end.time']);
                });
            }
        } else {
            projects = this.state.apiData.sort(function (a, b) {
                return parseInt(a['s.no'], 10) - parseInt(b['s.no'], 10);
            });
        }
        this.setState({
            projects: projects,
            sort: value
        });
    }

    render() {
        var ProjectList = this.state.projects.map(function (project, index) {
            return (
                <Project key={project['s.no']} data={project}/>
            );
        }, this);

        return (
            <div>
                <center>
                    <div className="margin-3">
                        <AutoComplete
                            hintText="Search..."
                            dataSource={this.state.projectNames}
                            onUpdateInput={this.search}
                            listStyle={{maxHeight: 200, overflow: 'auto'}}
                            fullWidth={true}
                        />
                        <div>
                            <div align="left">
                                <SelectField value={this.state.sort} onChange={this.handleSort} autoWidth={true} floatingLabelText="Sort By">
                                    <MenuItem value='none' primaryText="None" />
                                    <MenuItem value='percenatge-asc' primaryText="Percenatge - Low to High" />
                                    <MenuItem value='percenatge-dsc' primaryText="Percenatge - High to Low" />
                                    <MenuItem value='time-asc' primaryText="End Time - Low to High" />
                                    <MenuItem value='time-dsc' primaryText="End Time - High to Low" />
                                </SelectField>
                            </div>
                        </div>
                    </div>
                </center>
                <div className="margin-3 flex-box">{ProjectList}</div>
            </div>
        );
    }
}

export default App;
