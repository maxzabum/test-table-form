import { Button, Form, Input, Popconfirm, Table } from "antd";

type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;
const mock: (ColumnTypes[number] & {
  editable?: boolean;
  dataIndex: string;
})[] = [
  {
    title: "name",
    dataIndex: "dd",
    editable: true,
  },
];
function evil(fn: any) {
  return new Function("return " + fn)();
}

export const formatColumn = (columns: any[], formula: string, data: any) => {
  const allField = formula.match(/[a-zA-Z': `ก-๏]+[ a-zA-Z :'`ก-๏]/g) || [];
  let resulstField: any = formula.split("=");
  let formu: string = resulstField[0];
  // let rows = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];
  // for (let i = 0; i < columns.length; i++) {
  //   const column: any = columns[i];
  //   if (formu.indexOf(column.label) !== -1) {
  //     formu = formu.replace(column.label, rows[i].value.toString());
  //     console.log({ column: column.label });
  //   }
  // }
  let newData: any[] = [];
  for (let i = 0; i < data.row.length; i++) {
    const row = data.row[i];
    let rowData: any = {};
    rowData["key"] = i;
    for (let j = 0; j < row.length; j++) {
      const _row = row[j];
      rowData[columns[j].label] = _row.value;
    }
    newData.push(rowData);
  }
  // console.log({ newData });

  const column = columns.map((_column: any) => {
    return {
      title: (
        <div>
          <p>{_column.label}</p>
          <p>{_column.alter}</p>
        </div>
      ),
      dataIndex: _column.label,
      // editable: true,
    };
  });
  const _formula = {
    formula: formu,
    totalField: resulstField[1],
  };
  console.log({ data });

  return { column, _formula, newData };
};
