import type { InputRef } from "antd";
import { Button, Form, Input, Popconfirm, Table } from "antd";
import type { FormInstance } from "antd/lib/form";
import React, { useContext, useEffect, useRef, useState, Key } from "react";
import "./index.css";
const EditableContext = React.createContext<FormInstance<any> | null>(null);
interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
  template: any;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  template,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;
  console.log({ template });

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

// interface DataType {
//   key: React.Key;
//   name: string;
//   age: string;
//   address: string;
// }

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;
type TableProps = {
  _columns: any;
  _data: any;
  formula: any;
  onChange: any;
  template: any;
};
const App: React.FC<TableProps> = ({
  _columns,
  _data,
  formula,
  onChange,
  template,
  ...props
}) => {
  //   const [dataSource, setDataSource] = useState<any[]>(_data);

  const [count, setCount] = useState(_data.length);
  //   console.log({ _columns });

  const handleDelete = (key: React.Key) => {
    // const newData = dataSource.filter((item) => item.key !== key);
    // setDataSource(newData);
  };

  const handleAdd = () => {
    let newData: any = {
      key: count,
    };
    for (let i = 0; i < _columns.length; i++) {
      const column = _columns[i];
      newData[column.dataIndex] = "0";
    }
    let eiei = [..._data, newData];
    let newJa: any = [];
    for (let i = 0; i < eiei.length; i++) {
      const _eiei = eiei[i];
      console.log({ go: _eiei });

      let gogo = [];
      for (let j = 0; j < template.attribute.column.length; j++) {
        const column = template.attribute.column[j];

        // if (column.label === _columns[i].dataIndex) {
        gogo.push({ value: _eiei[column.label] });
        // }
      }
      newJa.push(gogo);
    }
    console.log({ newJa });
    // console.log({ eiei });

    onChange({ row: newJa });
    // setDataSource([...dataSource, newData]);
    // setCount(count + 1);
  };
  const evil = (fn: any) => {
    return new Function("return " + fn)();
  };
  const handleSave = (row: any) => {
    const newData = [..._data];
    const index = newData.findIndex((item) => row.key === item.key);
    // const allField = formula.match(/[a-zA-Z': `ก-๏]+[ a-zA-Z :'`ก-๏]/g) || [];
    // let resulstField: any = formula.split("=");
    // let formu: string = resulstField[0];
    let _formu = formula.formula;
    console.log({ formula, row, _columns });
    for (let i = 0; i < _columns.length; i++) {
      const column: any = _columns[i];
      if (_formu.indexOf(column.dataIndex) !== -1) {
        _formu = _formu.replace(
          column.dataIndex,
          row[column.dataIndex].toString()
        );
      }
    }
    console.log({ _formu: evil(_formu) });
    row[formula.totalField] = evil(_formu).toString();
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    console.log({ newData });
    // let eiei = [..._data, newData];
    let newJa: any = [];
    for (let i = 0; i < newData.length; i++) {
      const _eiei = newData[i];
      console.log({ go: _eiei });

      let gogo = [];
      for (let j = 0; j < template.attribute.column.length; j++) {
        const column = template.attribute.column[j];

        // if (column.label === _columns[i].dataIndex) {
        gogo.push({ value: _eiei[column.label] });
        // }
      }
      newJa.push(gogo);
    }
    console.log({ newJa });
    // console.log({ eiei });

    onChange({ row: newJa });
    // setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const defColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = _columns.map((_col: any, idx: any) => {
    return {
      ..._col,
      editable:
        template.attribute.column[idx].control.template.attribute.require ===
        "N"
          ? true
          : false,
    };
  });
  console.log({ defColumns });

  const columns = defColumns.map((col: any) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  //   const columns = defaultColumns.map((col) => {
  //     if (!col.editable) {
  //       return col;
  //     }
  //     return {
  //       ...col,
  //       onCell: (record: DataType) => ({
  //         record,
  //         editable: col.editable,
  //         dataIndex: col.dataIndex,
  //         title: col.title,
  //         handleSave,
  //       }),
  //     };
  //   });

  return (
    <div>
      <button onClick={() => console.log(_columns, _data)}>Click</button>

      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      <Table
        components={{
          body: {
            cell: (props: any) => (
              <EditableCell template={template} {...props} />
            ),
            row: EditableRow,
          },
        }}
        onChange={(e: any) => console.log({ e })}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={_data}
        columns={columns as ColumnTypes}
      />
    </div>
  );
};

export default App;
