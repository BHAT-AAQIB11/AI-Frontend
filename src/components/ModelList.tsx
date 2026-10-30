import type { ModelItemArray } from "../request";
import type { ChangeEvent } from "react";
import useFetch from "../hooks/useFetch";

export default function ModelList({
  setModel,
  model,
}: {
  setModel: (value: string) => undefined;
  model: string;
}) {
  const { data, isLoading, error } = useFetch<{ models: ModelItemArray }>(
    "http://localhost:11434/api/tags",
  );
  if (!data?.models && isLoading) {
    <p>Loading Models</p>;
  }
  const modelListMap = data?.models.map(({ name }) => (
    <option key={name}>{name}</option>
  ));

  return (
    <select
      className="modelList"
      value={model}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setModel(value);
        localStorage.setItem("selected-model", value);
      }}
    >
      {data && modelListMap}
      {error && <option>{error.message}</option>}
    </select>
  );
}
