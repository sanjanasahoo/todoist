import { Affix,PageHeader } from 'antd';

export default function Header() {
    return (
        <Affix offsetTop={10} style={{ background: '#db4c3f' }}>
            <PageHeader
                className="site-page-header"
                title="Home"
                subTitle="Welcome to Todoist"
            />
        </Affix>
    )
}