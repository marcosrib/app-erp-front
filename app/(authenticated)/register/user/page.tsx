import { FormSearch } from "../../components/formSearch";
import { Input } from "@/app/components/input";

export default function Users() {
    return (
      <FormSearch.Root>
        <FormSearch.InputContainer>
            <Input.Root>
              <Input.Label label="E-mail"/>
              <Input.Input />
            </Input.Root>
        </FormSearch.InputContainer>
        <FormSearch.Buttons>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Botão 1</button>
          <button className="ml-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Botão 2</button>
        </FormSearch.Buttons>
      </FormSearch.Root>
    );
  }
  