import React, { FC } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import App from "../components/TableComponent";
import { formatColumn } from "../utils/formatColumn";

type Props = {
  person: any;
  control: any;
  nestedIdx: number;
};

const Child: FC<Props> = ({ person, control, nestedIdx, ...props }) => {
  const { fields, append } = useFieldArray({
    control,
    name: `items[${nestedIdx}].layout`,
  });

  return (
    <div>
      {fields.map((layout: any, idx: number) => {
        if (layout.template.type === "tb") {
          return (
            <Controller
              render={({
                field: { onChange, value, onBlur, name, ref },
                formState: { errors, isSubmitted },
              }) => {
                console.log(value, { data: layout.data });

                const { column, _formula, newData } = formatColumn(
                  layout.template.attribute.column,
                  layout.template.formula,
                  value
                );
                console.log({ newData });
                return (
                  <App
                    key={layout.id}
                    _columns={column}
                    _data={newData}
                    formula={_formula}
                    onChange={onChange}
                    template={layout.template}
                  />
                );
              }}
              //   rules={{
              //     required: props.template.attribute.require === "Y" ? true : false,
              //   }}
              name={`items[${nestedIdx}].layout[${idx}].data`}
              control={control}
              //   valueName={"value"}
            />
          );
        }
      })}
      {/* <button onClick={() => console.log(fields)}>Click</button> */}
    </div>
  );
};

export default Child;
