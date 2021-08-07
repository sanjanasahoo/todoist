import { Affix,PageHeader } from 'antd';

export default function Header() {
    return (
        <Affix  className="header">
            <PageHeader
                id="heading"
                title="Home"
                subTitle="Welcome to Todoist"

            />
        </Affix>
    )
}