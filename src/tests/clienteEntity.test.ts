import { Cliente } from "../Cliente";

describe("Cliente", () => {

  it("deve criar uma Cliente com os dados corretos", () => {
    const t = new Cliente(1, "Estudar Jest", false, "01/06/2026");

    expect(t.id).toBe(1);              
    expect(t.nome).toBe("Estudar Jest");
    expect(t.telefone).toBe(false);
    expect(t.email).toBeNull();
  });

  it("deve rejeitar nome vazio", () => {
    const erros = Cliente.validar({ nome: "" });
    expect(erros.length).toBeGreaterThan(0);
    expect(erros).toContain("nome obrigatorio");
  }); 

});

it("deve converter de JSON para instancia (fromJSON)", () => {
    const json = { id: 5, nome: "clientName", telefone: true, criadaEm: "10/06/2026", email: null };
    const t = Cliente.fromJSON(json);
  
    expect(t).toBeInstanceOf(Cliente);
    expect(t.id).toBe(5);
    expect(t.nome).toBe("TesclientNamete");
  }); 
  
  it("deve converter para JSON (toJSON)", () => {
    const t = new Cliente(1, "Jest", false, "01/06/2026", null);
    const json = t.toJSON();
  
    expect(json).toEqual({
      id: 1, nome: "Jest", telefone: false,
      criadaEm: "01/06/2026", email: null
    });
  });
  
  it("deve lançar erro ao setar nome vazio", () => {
    const t = new it("deve converter de JSON para instancia (fromJSON)", () => {
  const json = { id: 5, nome: "clientName", telefone: true, criadaEm: "10/06/2026", email: null };
  const t = Cliente.fromJSON(json);

  expect(t).toBeInstanceOf(Cliente);  
  expect(t.id).toBe(5);
  expect(t.nome).toBe("clientName");
}); 

it("deve converter para JSON (toJSON)", () => {
  const t = new Cliente(1, "Jest", false, "01/06/2026", null);
  const json = t.toJSON();

  expect(json).toEqual({            
    id: 1, nome: "Jest", telefone: false,
    criadaEm: "01/06/2026", email: null
  });
});

it("deve lançar erro ao setar nome vazio", () => {
  const t = new Cliente(1, "clientName", false);
  expect(() => { t.nome = ""; }).toThrow("nome obrigatorio");
  
});
(1, "clientName", false);
    expect(() => { t.nome = ""; }).toThrow("nome obrigatorio");
    
  });