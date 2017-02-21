import React from 'react';
import {
	Link
} from "react-router";

export default class Pages extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
		var rows = 20;
		const {
			pageCount,
			total,
		} = this.props;
		if (total <= rows) {
			return (<div>
				<div className="pages">
					<ul className="tab">
						<li className="pagelist"><Link>1</Link></li>
					</ul>
				</div>
			</div>)
		}
		var rowArr = [];

		var pagesTotal = 0;

		if (total > rows) {
			if (total % rows) {
				pagesTotal = Math.ceil(total / rows)
			} else {
				pagesTotal = parseInt(total / rows)
			}
		}
		var pathname = this.props.location + "/";
		//console.log("pages:", pathname)
		for (let i = 1; i <= pagesTotal; i++) {
			rowArr.push(<li className={ (pageCount == i)?"pagelist":""} key={i}><Link to={pathname+i} onClick={()=>this.props.onClickHendle(i)}>{i}</Link></li>)
		}

		return (
			<div className="pages">
				<ul className="tab">
					{
						pageCount!==1 && <li><Link to={pathname+(pageCount-1)} onClick={()=>this.props.onClickHendle(pageCount-1)}>上一页</Link></li>
					}
					{rowArr}
					{
						(pageCount!==pagesTotal)&&<li><Link to={pathname+(pageCount+1)} onClick={()=>this.props.onClickHendle(pageCount+1)}>下一页</Link></li>
					}
				</ul>
			</div>
		);
	}
}