import React from 'react';

class ClubChangeList extends React.Component{
	render () {
		return (
			<table>
				<colgroup>
					<col width = "180"/>
					<col width = "＊"/>
				</colgroup>
				<tbody>
				    <tr>
				      <td className="createactive_table1">俱乐部LOGO</td>
				      <td>
				      	<span className="createactive_span">
				      		+
				      	</span>
				      	<span className="createactive_span1">图片尺寸为720*420，小于2M，格式为git,jpg,png</span>
				      </td>
				    </tr>
				    <tr>
				      <td className="createactive_table1"><i>*</i>名称</td>
				      <td>
						<input type="text" value="单车俱乐部" disabled/>
				      </td>
				    </tr>
				    <tr>
				      <td className="createactive_table1"><i>*</i>编号</td>
				      <td>
						<input type="text" value="P12" disabled/>
				      </td>
				    </tr>
				     <tr>
				      <td className="createactive_table1">简介</td>
				      <td>
						<textarea className="textarea"></textarea>
				      </td>
				    </tr>
			    </tbody>
			    <tfoot>
			    	<tr>
						<td colSpan="2" className="add_button">
							<button type="submit">发布</button>
			    		</td>
			    	</tr>
			    </tfoot>
			</table>
		);
	}
}
