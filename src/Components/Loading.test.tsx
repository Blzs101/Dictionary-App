import { render } from "@testing-library/react"
import Loading from "../Components/Loading"
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom';

describe(Loading, () => {
    it("loading show up on document", () => {
        const renderApp = render(<Loading />);
        const loadingElement = renderApp.getByTestId('loading');
        expect(loadingElement).toBeInTheDocument();
    })
})