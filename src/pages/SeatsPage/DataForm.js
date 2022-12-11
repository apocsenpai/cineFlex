import styled from "styled-components";
import OrangeButton from "../../components/OrangeButton";

const DataForm = ({ finishOrder, buyers, setBuyers }) => {

  function changeBuyersData(e, id) {
    const changedBuyersList = buyers.map((b) =>
      b.idAssento === id ? { ...b, [e.target.name]: e.target.value } : b
    );
    setBuyers(changedBuyersList);
  }

  return (
    <Data onSubmit={finishOrder}>
      <h3>Dados do comprador</h3>
      {!buyers.length ? (
        <div>
          <div>
            <DataInput type={`text`} required />
            <label>Nome</label>
          </div>
          <div>
            <DataInput type={`text`} required />
            <label>CPF</label>
          </div>
        </div>
      ) : (
        buyers.map((buyer, index) => {
          return (
            <InputGroup
              key={buyer.idAssento}
              buyer={buyer}
              changeBuyersData={changeBuyersData}
            >
              {buyers.length > 1 && <h5>Pessoa {index + 1}</h5>}
            </InputGroup>
          );
        })
      )}

      <section>
        <ConfirmButton data-test="book-seat-btn" type={`submit`}>
          Reservar assento(s)
        </ConfirmButton>
      </section>
    </Data>
  );
};

export default DataForm;

const InputGroup = ({ buyer, changeBuyersData, children }) => {
  return (
    <div>
      {children}
      <div>
        <DataInput
          data-test="client-name"
          name="nome"
          type={`text`}
          value={buyer.nome}
          onChange={(e) => changeBuyersData(e, buyer.idAssento)}
          required
        />
        <label>Nome</label>
      </div>
      <div>
        <DataInput
          data-test="client-cpf"
          name="cpf"
          type={`text`}
          value={buyer.cpf}
          onChange={(e) => changeBuyersData(e, buyer.idAssento)}
          required
        />
        <label>CPF</label>
      </div>
    </div>
  );
};

const Data = styled.form`
  padding: 0px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  h3 {
    display: flex;
    width: 100%;
    height: 40px;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    font-size: 24px;
  }
  div {
    padding-top: 10px;
    position: relative;
    label {
      position: absolute;
      left: 16px;
      color: #afafaf;
      font-size: 18px;
      pointer-events: none;
      transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }
  }
  & > section {
    display: flex;
    justify-content: center;
  }
`;

const DataInput = styled.input`
  width: 327px;
  height: 51px;
  padding-left: 16px;
  font-size: 18px;
  border-radius: 3px;
  border: 1px solid #d4d4d4;
  transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  & ~ label {
    transform: translateY(1rem);
    padding: 0 0.2rem;
    background-color: #fff;
  }
  &:valid ~ label {
    transform: translateY(-50%) scale(0.8);
  }
  &:focus,
  &:hover {
    outline: none;
    border: 1.5px solid #1a73e8;
    & ~ label {
      transform: translateY(-50%) scale(0.8);
      color: #1a73e8;
    }
  }
`;

const ConfirmButton = styled(OrangeButton)`
  width: 225px;
  height: 42px;
  margin-top: 40px;
`;
