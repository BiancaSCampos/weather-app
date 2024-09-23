import { getDayOfWeek } from "../functions/getDayOfWeek";


describe('getDayOfWeek', () => {

  it('deve retornar "Domingo" para a data "2024-09-22"', () => {
    expect(getDayOfWeek("2024-09-22")).toBe("Domingo");
  });

  it('deve retornar "Segunda" para a data "2024-09-23"', () => {
    expect(getDayOfWeek("2024-09-23")).toBe("Segunda");
  });

  it('deve retornar "Quinta" para a data "2024-02-29" (ano bissexto)', () => {
    expect(getDayOfWeek("2024-02-29")).toBe("Quinta");
  });

  it('deve retornar "Sexta" para a data "2000-01-01"', () => {
    expect(getDayOfWeek("2000-01-01")).toBe("Sábado");
  });

  it('deve retornar undefined para uma string vazia', () => {
    expect(getDayOfWeek("")).toBe(undefined);
  });

  it('deve retornar undefined para uma data inválida', () => {
    expect(getDayOfWeek("data-invalida")).toBe(undefined);
  });

  it('deve retornar undefined para null', () => {
    expect(getDayOfWeek(null as unknown as string)).toBe(undefined);
  });

  it('deve retornar undefined para undefined', () => {
    expect(getDayOfWeek(undefined as unknown as string)).toBe(undefined);
  });
});
