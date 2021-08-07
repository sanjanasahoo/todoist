import { Affix,PageHeader } from 'antd';

export default function Header() {
    return (
        <Affix  className="header">
            <PageHeader
                className="site-page-header"
                title="Home"
                subTitle="Welcome to Todoist"
            />
        </Affix>
    )
}