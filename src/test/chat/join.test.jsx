import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { io } from "socket.io-client";
import Join from "../../components/Join";   

describe("Join Component", () => {
    it("Vamos testar se tudo esta aparecendo na tela", () => {
        const setChatVisibility = jest.fn();
        const setSocket = jest.fn();

        render(
            <Join setChatVisibility={setChatVisibility} setSocket={setSocket} />
        );

        expect(screen.getByText("Chat em tempo real")).toBeInTheDocument();
        expect(screen.getByTestId("name-input")).toBeInTheDocument();
        expect(screen.getByTestId("submit-button")).toBeInTheDocument();
    })
    it("Vamos testar se as mudanças de valor no input estão sendo capturadas e as funções estão sendo chamadas", () => {
        const setChatVisibility = jest.fn();
        const setSocket = jest.fn();

        render(<Join setChatVisibility={setChatVisibility} setSocket={setSocket} />);

        const input = screen.getByTestId("name-input");
        fireEvent.change(input, { target: { value: "TestUser" } });

        const button = screen.getByTestId("submit-button");
        fireEvent.click(button);

        expect(setChatVisibility).toHaveBeenCalledWith(true);
        expect(setSocket).toHaveBeenCalledWith();
    })
})