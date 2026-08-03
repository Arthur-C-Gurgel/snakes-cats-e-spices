import { Pedido } from "../Pedido";

describe("Pedido", () => {

  it("deve criar uma Pedido com os dados corretos", () => {
    const t = new Pedido(1, "Estudar Jest", false, "01/06/2026");

    expect(t.id).toBe(1);              
    expect(t.titulo).toBe("Estudar Jest");
    expect(t.concluida).toBe(false);
    expect(t.imagem).toBeNull();
  });

  it("deve rejeitar titulo vazio", () => {
    const erros = Pedido.validar({ titulo: "" });
    expect(erros.length).toBeGreaterThan(0);
    expect(erros).toContain("Titulo obrigatorio");
  });

});

it("deve converter de JSON para instancia (fromJSON)", () => {
    const json = { id: 5, titulo: "Teste", concluida: true, criadaEm: "10/06/2026", imagem: null };
    const t = Pedido.fromJSON(json);
  
    expect(t).toBeInstanceOf(Pedido);
    expect(t.id).toBe(5);
    expect(t.titulo).toBe("Teste");
  }); 
  
  it("deve converter para JSON (toJSON)", () => {
    const t = new Pedido(1, "Jest", false, "01/06/2026", null);
    const json = t.toJSON();
  
    expect(json).toEqual({
      id: 1, titulo: "Jest", concluida: false,
      criadaEm: "01/06/2026", imagem: null
    });
  });
  
  it("deve lançar erro ao setar titulo vazio", () => {
    const t = new it("deve converter de JSON para instancia (fromJSON)", () => {
  const json = { id: 5, titulo: "Teste", concluida: true, criadaEm: "10/06/2026", imagem: null };
  const t = Pedido.fromJSON(json);

  expect(t).toBeInstanceOf(Pedido);  
  expect(t.id).toBe(5);
  expect(t.titulo).toBe("Teste");
}); 

it("deve converter para JSON (toJSON)", () => {
  const t = new Pedido(1, "Jest", false, "01/06/2026", null);
  const json = t.toJSON();

  expect(json).toEqual({          
    id: 1, titulo: "Jest", concluida: false,
    criadaEm: "01/06/2026", imagem: null
  });
});

it("deve lançar erro ao setar titulo vazio", () => {
  const t = new Pedido(1, "Teste", false);
  expect(() => { t.titulo = ""; }).toThrow("Titulo obrigatorio");
 
});
(1, "Teste", false);
    expect(() => { t.titulo = ""; }).toThrow("Titulo obrigatorio");
    
  });