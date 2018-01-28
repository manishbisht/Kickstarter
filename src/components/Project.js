/**
 * Created by manish on 28/1/18.
 */

import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import LinearProgress from 'material-ui/LinearProgress';
import LocationIcon from 'material-ui/svg-icons/communication/location-on';

class Project extends Component {
    render() {
        var goalAmount = parseInt((this.props.data['amt.pledged'] * 100) / this.props.data['percentage.funded'], 10);
        var currentAmount = this.props.data['amt.pledged'];
        var backers = parseInt(this.props.data['num.backers'], 10);
        return (
            <div className="box">
                <Card>
                    <CardHeader
                        title={this.props.data.title}
                        subtitle={'By: ' + this.props.data.by}
                        actAsExpander={false}
                        showExpandableButton={false}
                    />
                    <CardText style={{textAlign: 'justify'}}>
                        { this.props.data.blurb }<br /><br />
                        <div className="margin-bottom-5 font-20">
                            <center><LocationIcon />{this.props.data.location}</center>
                        </div>
                        <div className="flex-box margin-bottom-3">
                            <Chip>
                                <Avatar size={32}>{this.props.data.currency[0].toUpperCase()}</Avatar>
                                {this.props.data.currency.toUpperCase()}
                            </Chip>&nbsp;
                            <Chip>
                                <Avatar size={32}>{this.props.data.type[0]}</Avatar>
                                {this.props.data.type}
                            </Chip>&nbsp;
                            <Chip>
                                <Avatar size={32}>{this.props.data.country[0]}</Avatar>
                                {this.props.data.country}
                            </Chip>
                        </div>
                        <strong>{currentAmount.toLocaleString()} {this.props.data.currency.toUpperCase()}</strong> raised by <strong>{backers.toLocaleString()} backers</strong>
                        <LinearProgress style={{'marginTop': 5, 'marginBottom': 5, 'height': 15}} mode="determinate" value={currentAmount} max={goalAmount} />
                        <strong>{this.props.data['percentage.funded']}%</strong> of <strong>{goalAmount.toLocaleString()} {this.props.data.currency.toUpperCase()}</strong> fixed goal
                    </CardText>
                    <CardActions>
                        <a href={'https://www.kickstarter.com' + this.props.data.url} target="_blank">
                            <RaisedButton label="Open Project" fullWidth={true} primary={true} />
                        </a>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default Project;