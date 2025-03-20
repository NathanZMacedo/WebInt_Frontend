import React from "react";
import { render, screen, fireEvent } from "@testing-library/react"; 
import "@testing-library/jest-dom/extend-expect"

import LoginForm from "../../components/auth/login/Login";

describe("Componente Loginform", () => {
    test("renderiza o formulario de login com campos de email e senha e um botão de enviar", () => {
        render(<LoginForm onSubmitForm={jest.fn()}/>);

        expect(screen.getByText("Logar")).toBeInTheDocument();

        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByText(/Senha/i)).toBeInTheDocument();

        expect(screen.getByTestId("submit-button")).toBeInTheDocument();
    })

    test("atualiza os valores dos campos de email e senha ao alterar", () => {
        render(<LoginForm onSubmitForm={jest.fn()} />);

        const emailInput = screen.getByTestId("email-input");
        const passwordInput = screen.getByTestId("password-input");

        fireEvent.change(emailInput, { target: { value: "test@example.com" }});
        fireEvent.change(passwordInput, { target: { value: "123456" }});

        expect(emailInput.value).toBe("test@example.com")
        expect(passwordInput.value).toBe("123456")
    })

    test("chama onSubmitForm com os dados do usuario quando o formulario é enviado", () => {
        const mockSubmit = jest.fn();
        render(<LoginForm onSubmitForm={mockSubmit} />);

        const emailInput = screen.getByTestId("email-input");
        const passwordInput = screen.getByTestId("password-input");
        const submitButton = screen.getByTestId("submit-button");

        fireEvent.change(emailInput, { target: { value: "test@example.com" }});
        fireEvent.change(passwordInput, { target: { value: "123456" }});
        fireEvent.click(submitButton);

        expect(mockSubmit).toHaveBeenCalledWith({
            email: "test@example.com",
            password: "123456",
        })
    })
})

