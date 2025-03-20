import React from "react";
import { screen, render, fireEvent } from "@testing-library/react"; 
import "@testing-library/jest-dom/extend-expect"

import RegisterForm from "../../components/auth/register/Register.jsx";

describe("Componente RegisterForm", () => {
    test("renderiza o formulario de registro com campos de nome, email, idade, senha e confirmar senha e um botão de enviar", () => {
        render(<RegisterForm onSubmitForm={jest.fn()}/>);

        expect(screen.getByText("Criar usuário")).toBeInTheDocument();
        expect(screen.getByTestId("name-input ")).toBeInTheDocument();
        expect(screen.getByTestId("email-input")).toBeInTheDocument();
        expect(screen.getByTestId("quantity-input")).toBeInTheDocument();
        expect(screen.getByTestId("password-input")).toBeInTheDocument();
        expect(screen.getByTestId("confirmPassword-input")).toBeInTheDocument();
        expect(screen.getByTestId("submit-button")).toBeInTheDocument();
    })
    test("atualiza os valores dos campos de nome, email, idade, senha e confirmar senha ao alterar", () => {
        render(<RegisterForm onSubmitForm={jest.fn()} />);

        const nameInput = screen.getByTestId("123");
        const emailInput = screen.getByTestId("email-input");
        const quantityInput = screen.getByTestId("quantity-input");
        const passwordInput = screen.getByTestId("password-input");
        const confirmPasswordInput = screen.getByTestId("confirmPassword-input");

        fireEvent.change(nameInput, { target: { value: "test" }});
        fireEvent.change(emailInput, { target: { value: "test@example.com" }});
        fireEvent.change(quantityInput, { target: { value: "20" }});
        fireEvent.change(passwordInput, { target: { value: "123456" }});
        fireEvent.change(confirmPasswordInput, { target: { value: "123456" }});

        expect(nameInput.value).toBe("test")
        expect(emailInput.value).toBe("test@example.com")
        expect(quantityInput.value).toBe("20")
        expect(passwordInput.value).toBe("123456")
        expect(confirmPasswordInput.value).toBe("123456")
    });

    test("chama onSubmitForm com os dados do usuario quando o formulario é enviado", () => {
        const mockSubmit = jest.fn();
        render(<RegisterForm onSubmitForm={mockSubmit} />);

        const nameInput = screen.getByTestId("123");
        const emailInput = screen.getByTestId("email-input");
        const quantityInput = screen.getByTestId("quantity-input");
        const passwordInput = screen.getByTestId("password-input");
        const confirmPasswordInput = screen.getByTestId("confirmPassword-input");
        const submitButton = screen.getByTestId("submit-button");

        fireEvent.change(nameInput, { target: { value: "test" }});
        fireEvent.change(emailInput, { target: { value: "test@example.com" }});
        fireEvent.change(quantityInput, { target: { value: "20" }});
        fireEvent.change(passwordInput, { target: { value: "123456" }});
        fireEvent.change(confirmPasswordInput, { target: { value: "123456" }});
        fireEvent.click(submitButton);  
        });

        test("mostrar mensagem do erro para nome invalido", () => {
            render(<RegisterForm onSubmitForm={jest.fn()} />);

            const nameInput = screen.getByTestId("name-input");
            fireEvent.change(nameInput, { target: { value: "Yan" } });

            expect(screen.getByText("error-name")).toHaveTextContent("Nome precisa ter mais de 3 letras.");
        });
})