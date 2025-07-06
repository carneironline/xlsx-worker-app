interface Usuario {
    id: number;
    name: string;
    email: string;
    username: string;
}

export default async function ListaUsuarios() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const usuarios = (await res.json()) as Usuario[];

    return (
        <div>
            <h2 className='text-xl font-bold mb-4'>Lista de Usuários</h2>

            <ul className='space-y-2 flex flex-col md:flex-row flex-wrap gap-2'>
                {usuarios.map((usuario) => (
                    <li key={usuario.id} className='p-3 border rounded text-sm'>
                        <p>
                            <strong>Nome:</strong> {usuario.name}
                        </p>
                        <p>
                            <strong>Usuário:</strong> {usuario.username}
                        </p>
                        <p>
                            <strong>Email:</strong> {usuario.email}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
