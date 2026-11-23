# TaskFlow Frontend

Aplicativo mobile de gerenciamento de tarefas desenvolvido com React Native + Expo + TypeScript.

## Tecnologias

- React Native 0.76
- Expo 52
- TypeScript
- Axios
- React Navigation 6
- React Native Gesture Handler
- React Native Screens
- React Native Safe Area Context

## Pré-requisitos

- Node.js >= 18
- npm
- Expo CLI: `npm install -g @expo/cli`
- Android Studio (para emulador) ou dispositivo físico
- Backend TaskFlow rodando (porta 3000)

## Instalação

```powershell
# Navegar para o diretório
Set-Location taskflow-frontend

# Instalar dependências
npm install
```

## Configuração da API

O arquivo `src/services/api.ts` define a URL base da API:

```typescript
const API_BASE_URL = __DEV__ 
  ? "http://10.0.2.2:3000/api"  // Android Emulator
  : "http://localhost:3000/api"; // Expo Web / iOS Simulator
```

### Endereços por plataforma:

| Plataforma | Endereço |
|------------|----------|
| Android Emulator | `http://10.0.2.2:3000/api` |
| Dispositivo físico (mesma rede Wi-Fi) | `http://SEU_IP_LOCAL:3000/api` |
| Expo Web / iOS Simulator | `http://localhost:3000/api` |

**Importante para dispositivo físico:**
1. Descubra o IP local do computador: `ipconfig` (procure "IPv4 Address")
2. Computador e celular devem estar na mesma rede Wi-Fi
3. Atualize `API_BASE_URL` em `src/services/api.ts`
4. Certifique-se que o firewall permite conexões na porta 3000

## Execução

```powershell
# Iniciar o servidor de desenvolvimento Expo
npm start
# ou
npx expo start
```

Opções de execução:
- **Android Emulator**: Pressione `a` no terminal do Expo
- **Dispositivo físico**: Escaneie o QR code com o app Expo Go
- **Web**: Pressione `w` no terminal do Expo

## Estrutura do Projeto

```
taskflow-frontend/
├── src/
│   ├── components/
│   │   ├── TaskItem.tsx      # Item da lista de tarefas
│   │   ├── TaskForm.tsx      # Formulário criar/editar
│   │   └── EmptyState.tsx    # Estado vazio
│   ├── screens/
│   │   └── TaskListScreen.tsx # Tela principal
│   ├── services/
│   │   └── api.ts            # Configuração Axios + API
│   ├── types/
│   │   └── task.ts           # Tipos TypeScript
│   └── App.tsx               # Componente raiz
├── .gitignore
├── app.json
├── package.json
├── tsconfig.json
└── README.md
```

## Funcionalidades

- ✅ Listar tarefas com pull-to-refresh
- ✅ Criar nova tarefa (título obrigatório, descrição opcional)
- ✅ Editar tarefa existente
- ✅ Marcar/desmarcar como concluída
- ✅ Excluir tarefa com confirmação
- ✅ Contador de tarefas pendentes/concluídas
- ✅ Estados de carregamento e erro
- ✅ Interface adaptável (Android/iOS)
- ✅ Validação de formulário

## Interface

- Fundo claro (#f5f5f5)
- Azul primário (#2196F3)
- Cards com cantos arredondados (12px)
- Sombras suaves
- Botões com área de toque adequada (48dp mínimo)
- Tipografia legível

## Scripts Disponíveis

```powershell
npm start          # Inicia Expo
npm run android    # Abre no emulador Android
npm run ios        # Abre no simulador iOS (macOS apenas)
npm run web        # Abre no navegador
npm run lint       # Executa ESLint
```

## Build para Produção

```powershell
# Android (APK)
npx expo build:android

# iOS (requer macOS)
npx expo build:ios

# EAS Build (recomendado)
npm install -g eas-cli
eas build --platform android
```

## Troubleshooting

### Erro de conexão com a API
- Verifique se o backend está rodando: `http://localhost:3000/api/health`
- No Android Emulator, use `10.0.2.2` em vez de `localhost`
- No dispositivo físico, use o IP local da máquina

### Erro "Network request failed"
- Verifique firewall do Windows (porta 3000)
- Confirme que celular e PC estão na mesma rede
- Teste no navegador do celular: `http://SEU_IP:3000/api/health`

### Metro bundler não inicia
```powershell
npx expo start --clear
```

## Licença

Projeto acadêmico - TaskFlow
