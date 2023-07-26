import { fireEvent, render } from "@testing-library/react"
import { Search } from "../Components/Search"
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { mainStore } from "../ReduxStates/MainStore";

describe("search component testting", () => {

    it("font list items show up", () => {
        const queryClient = new QueryClient();
        const searchRender = render(
            <QueryClientProvider client={queryClient}>
                <Provider store={mainStore}>
                    <Search />
                </Provider>
            </QueryClientProvider>);
        const fontListItems = searchRender.getAllByTestId("select-option");
        expect(fontListItems.length).toBe(3)
    });

    it("input field works", () => {
        const queryClient = new QueryClient();
        const searchRender = render(
            <QueryClientProvider client={queryClient}>
                <Provider store={mainStore}>
                    <Search />
                </Provider>
            </QueryClientProvider>);
        const inputField = searchRender.getByTestId("input-field")
        fireEvent.change(inputField, { target: { value: 'keyboard' } });
        expect(inputField).toHaveDisplayValue("keyboard");
    });

    it("input field reset upon submit", () => {
        const queryClient = new QueryClient();
        const searchRender = render(
            <QueryClientProvider client={queryClient}>
                <Provider store={mainStore}>
                    <Search />
                </Provider>
            </QueryClientProvider>);
        const inputField = searchRender.getByTestId("input-field");
        const submitButton = searchRender.getByTestId("submit-button");
        fireEvent.change(inputField, { target: { value: 'keyboard' } });
        fireEvent.click(submitButton)
        expect(inputField).toHaveDisplayValue("");
    });

})
